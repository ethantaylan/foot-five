import { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { supabase } from "../../supabase";
import { Players, PlayersResponse } from "../../models/Players";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { List } from "../List/List";
import { SubscribeModal } from "../SubscribeModal/SubscribeModal";
import { FivePlayerResponse } from "../../models/FivePlayer";
import { Fives, FivesResponse } from "../../models/Fives";
import { useParams } from "react-router-dom";
import DateAndPlace from "../DateAndPlace/DateAndPlace";
import { useUser } from "@clerk/clerk-react";
import { useGlobalStore } from "../../context/store";
import { closeModal } from "../../utils/ShowModal";
import { Spinner } from "../Spinner/Spinner";

export default function PlayersList() {
  const { user } = useUser();
  const [five, setFive] = useState<Fives>();
  const [titulars, setTitulars] = useState<Players[]>([]);
  const [substitutes, setSubstitutes] = useState<Players[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Players | null>();
  const { setPlayerIsAlreadySubscribed, setIsUserAdmin } = useGlobalStore();

  const { id } = useParams();

  const getFivePlayersFetch = useSupabase<FivePlayerResponse[]>(
    () =>
      supabase
        .from("five_players")
        .select("is_substitute, player:player_id(*)")
        .eq("five_id", five?.id),
    false
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    true
  );

  const getFivesFetch = useSupabase<FivesResponse>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .eq("id", id)
        .order("id", { ascending: false })
        .single(),
    true
  );

  const deletePlayerFetch = useSupabase<Players>(
    () =>
      supabase
        .from("five_players")
        .delete()
        .eq("player_id", user?.id)
        .eq("five_id", five?.id),
    false
  );

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayerInfo(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  useEffect(() => {
    playerInfo && setIsUserAdmin(playerInfo.isAdmin);
  }, [playerInfo]);

  useEffect(() => {
    getFivesFetch.response && setFive(new Fives(getFivesFetch.response));
  }, [getFivesFetch.response]);

  useEffect(() => {
    if (five) {
      setPlayerIsAlreadySubscribed(
        five.players.some(
          (player) => player?.userId === (playerInfo?.userId ?? "")
        )
      );

      setTitulars(five.players.filter((player) => !player.isSubstitute));
      setSubstitutes(five.players.filter((player) => player.isSubstitute));
    }
  }, [five]);

  const handleSubscribeModalConfirmation = () => {
    getFivePlayersFetch.executeFetch().then(() => {
      getFivePlayersFetch.executeFetch();
      getFivesFetch.executeFetch();
    });
  };

  const handleUnsuscribeConfirmation = async () => {
    deletePlayerFetch.executeFetch().then(() => {
      getFivePlayersFetch.executeFetch();
      getFivesFetch.executeFetch();
      closeModal("confirmModal");
    });
  };

  if (getFivePlayersFetch.loading || getFivesFetch.loading) {
    return <Spinner />;
  }

  return (
    five &&
    playerInfo && (
      <div className="w-full">
        <ConfirmModal onConfirm={handleUnsuscribeConfirmation} />

        <SubscribeModal
          onConfirm={handleSubscribeModalConfirmation}
          five={five}
          playerInfo={playerInfo}
        />

        <div className="flex flex-col w-full gap-5">
          <DateAndPlace
            date={five.date}
            place={five.place}
            placeUrl={five.placeUrl}
          />

          <List
            withSubscriptionButton={true}
            players={titulars}
            onDeleteUser={() => {
              getFivePlayersFetch.executeFetch();
              getFivesFetch.executeFetch();
            }}
          />

          <List
            isSubstitutePlayers
            players={substitutes}
            onDeleteUser={() => {
              getFivePlayersFetch.executeFetch();
              getFivesFetch.executeFetch();
            }}
          />
        </div>
      </div>
    )
  );
}
