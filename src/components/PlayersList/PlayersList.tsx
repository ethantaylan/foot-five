import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Players, PlayersResponse } from "../../models/Player";
import { List } from "../Players/Players";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { FivePlayerResponse } from "../../models/FivePlayer";
import { Five, FiveResponse } from "../../models/Five";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "../Spinner/Spinner";
import { FiveInformation } from "../FiveInformation/FiveInformation";
import { useSupabase } from "../../hooks/useSupabase";
import { useGlobalStore } from "../../context";
import { EditFiveModal } from "../EditFiveModal/EditFiveModal";
import { UnSubscribeModal } from "../UnSubscribeModal/UnSubscribeModal";
import { DeleteFiveModal } from "../DeleteFiveModal/DeleteFiveModal";

export default function PlayersList() {
  const { user } = useUser();
  const { id } = useParams();
  const { setPlayerIsAlreadySubscribed, setIsUserAdmin } = useGlobalStore();

  const [five, setFive] = useState<Five>();
  const [titulars, setTitulars] = useState<Players[]>([]);
  const [substitutes, setSubstitutes] = useState<Players[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Players | null>();
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
    false
  );

  const getFivesFetch = useSupabase<FiveResponse>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .eq("id", id)
        .order("id", { ascending: false })
        .single(),
    true
  );

  useEffect(() => {
    user && playerInfoFetch.executeFetch();
  }, [user]);

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayerInfo(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  useEffect(() => {
    playerInfo && setIsUserAdmin(playerInfo.isAdmin);
  }, [playerInfo]);

  useEffect(() => {
    getFivesFetch.response && setFive(new Five(getFivesFetch.response));
  }, [getFivesFetch.response]);

  useEffect(() => {
    if (playerInfo && five) {
      setPlayerIsAlreadySubscribed(
        five.players.some(
          (player) => player?.userId === (playerInfo?.userId ?? "")
        )
      );

      setTitulars(five.players.filter((player) => !player.isSubstitute));
      setSubstitutes(five.players.filter((player) => player.isSubstitute));
    }
  }, [five, playerInfo]);

  const handleSubscribeModalConfirmation = () => {
    getFivePlayersFetch.executeFetch().then(() => {
      getFivesFetch.executeFetch();
      playerInfoFetch.executeFetch();
    });
  };

  if (getFivePlayersFetch.loading || getFivesFetch.loading) {
    return <Spinner />;
  }

  const handleCanSubscribeToFive = () => {
    const date = new Date();
    const fiveDate = new Date(five?.date || "");

    if (fiveDate < date) {
      return true;
    }
    return false;
  };

  if (five && playerInfo) {
    return (
      <div className="flex flex-col w-full">
        <UnSubscribeModal
          onConfirm={() => {
            getFivePlayersFetch.executeFetch();
            getFivesFetch.executeFetch();
          }}
        />
        <SubscribeModal onConfirm={handleSubscribeModalConfirmation} />
        <EditFiveModal onConfirm={() => getFivesFetch.executeFetch()} />
        <DeleteFiveModal />

        <div className="flex flex-col w-full">
          <FiveInformation playerInfo={playerInfo} five={five} />

          <List
            canSubscribe={handleCanSubscribeToFive()}
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
    );
  }
}
