import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { showModal } from "../../utils/ShowModal";
import { NewFiveModal } from "../NewFiveModal/NewFiveModal";
import { Players, PlayersResponse } from "../../models/Player.ts";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "../Spinner/Spinner.tsx";
import { Modals } from "../../constants/Modals.ts";
import { Five, FiveResponse } from "../../models/Five.ts";
import { Fives } from "../Fives/Fives.tsx";
import { useSupabase } from "../../hooks/useSupabase.ts";
import { useGlobalStore } from "../../context/index.tsx";

export const FiveList = () => {
  const { setPlayerInfo } = useGlobalStore();
  const { user } = useUser();
  const [fives, setFives] = useState<Five[]>([]);
  const [fiveId, setFiveId] = useState<number>();

  const getFivesFetch = useSupabase<FiveResponse[]>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .order("id", { ascending: false })
        .limit(4),
    true
  );

  const deleteFiveFetch = useSupabase<FiveResponse[]>(
    () => supabase.from("fives").delete().eq("id", fiveId),
    false
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    true
  );

  useEffect(() => {
    getFivesFetch.response &&
      setFives(getFivesFetch.response.map((f) => new Five(f)));
  }, [getFivesFetch.response]);

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayerInfo(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  useEffect(() => {
    fiveId &&
      deleteFiveFetch.executeFetch().then(() => {
        getFivesFetch.executeFetch();
      });
  }, [fiveId]);

  if (getFivesFetch.loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <NewFiveModal onConfirm={() => getFivesFetch.executeFetch()} />

      <h1 className="flex text-xl font-bold">Bienvenue !</h1>
      <h2 className="mt-3 mb-1">Liste des fives</h2>

      <Fives fives={fives} onRemoveFive={setFiveId} />

      <button
        onClick={() => showModal(Modals.NEW_FIVE_MODAL)}
        className="btn mt-3 w-full btn-sm rounded btn-primary"
      >
        Nouveau five
      </button>
    </div>
  );
};
