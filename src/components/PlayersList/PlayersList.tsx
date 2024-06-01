import { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { supabase } from "../../supabase";
// import { XCircleIcon } from "@heroicons/react/16/solid";
import { useGlobalStore } from "../../context/store";
import { Players } from "../../models/Players";
import { showModal } from "../../utils/ShowModal";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { List } from "../List/List";
import { SubscribeModal } from "../SubscribeModal/SubscribeModal";
import { FivePlayer, FivePlayerResponse } from "../../models/FivePlayer";

export default function PlayersList() {
  const {
    // players,
    // setPlayers,
    // isUserAlreadySubscribed,
    // substitutePlayers,
    // setSubstitutePlayers,
    five,
    players,
    setPlayers,
    playerInfo,
  } = useGlobalStore();
  const [titulars, setTitulars] = useState<Players[]>([]);
  const [substitutes, setSubstitutes] = useState<Players[]>([]);
  const [isUserAlreadySubscribed, setIsUserAlreadySubscribed] =
    useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFivePlayersFetch = useSupabase<any>(
    () =>
      supabase
        .from("five_players")
        .select("is_substitute, player:player_id(*)")
        .eq("five_id", five?.id),
    false
  );

  useEffect(() => {
    if (getFivePlayersFetch.response) {
      console.log(
        getFivePlayersFetch.response.map(
          (player: FivePlayerResponse) => new FivePlayer(player)
        )
      );
      setPlayers(
        getFivePlayersFetch.response.map(
          (player: FivePlayerResponse) =>
            new Players({
              ...player.player,
              is_substitute: player.is_substitute,
            })
        )
      );
    }
  }, [getFivePlayersFetch.response]);

  useEffect(() => {
    setIsUserAlreadySubscribed(
      !!players.find((player) => player?.userId === (playerInfo?.id ?? ""))
    );

    setTitulars(players.filter((player) => !player.isSubstitute));
    setSubstitutes(players.filter((player) => player.isSubstitute));
  }, [players]);

  // const getPlayersFetch = useSupabase<PlayersResponse[]>(
  //   () => supabase.from("players").select("*").eq("is_substitute", false),
  //   true
  // );

  // const getSubstituePlayersFetch = useSupabase<PlayersResponse[]>(
  //   () => supabase.from("players").select("*").eq("is_substitute", true),
  //   true
  // );

  // useEffect(() => {
  //   getPlayersFetch.response &&
  //     setPlayers(getPlayersFetch.response.map((p) => new Players(p)));
  // }, [getPlayersFetch.response]);

  // useEffect(() => {
  //   getSubstituePlayersFetch.response &&
  //     setSubstitutePlayers(
  //       getSubstituePlayersFetch.response.map((p) => new Players(p))
  //     );
  // }, [getSubstituePlayersFetch.response]);

  const handleSubscribeModalConfirmation = async () => {
    getFivePlayersFetch.executeFetch();
  };

  return (
    <div className="w-full">
      <ConfirmModal
        onConfirm={() => {}}
        // onConfirm={() => {
        //   getFiveFetch.executeFetch();
        // }}
      />

      <SubscribeModal
        onConfirm={handleSubscribeModalConfirmation}
        // onConfirm={() => {
        //   getFiveFetch.executeFetch();
        // }}
      />

      <div className="flex flex-col w-full gap-10">
        <List
          withSubscriptionButton={true}
          isUserAlreadySubscribed={isUserAlreadySubscribed || undefined}
          players={titulars}
          onSubscribe={() =>
            isUserAlreadySubscribed
              ? showModal("confirmModal")
              : showModal("subscribeModal")
          }
        />

        <List isSubstitutePlayers players={substitutes} />
      </div>
    </div>
  );
}
