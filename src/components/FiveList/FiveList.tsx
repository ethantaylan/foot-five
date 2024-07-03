import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { showModal } from "../../utils/ShowModal";
import { NewFiveModal } from "../Modals/NewFiveModal/NewFiveModal.tsx";
import { Players, PlayersResponse } from "../../models/Player.ts";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "../Spinner/Spinner.tsx";
import { Modals } from "../../constants/Modals.ts";
import { useSupabase } from "../../hooks/UseSupabase.ts";
import FiveHeader from "../FiveHeader/FiveListHeader.tsx";
import { FiveResponse, Five as FiveModel } from "../../models/Five.ts";
import { Five } from "../Five/Five.tsx";
import { usePlayerInfoStore } from "../../store/PlayerInfo.ts";

export const FiveList = () => {
  const { setPlayerInfo } = usePlayerInfoStore();
  const { user } = useUser();
  const [fives, setFives] = useState<FiveModel[]>([]);
  const [fiveId, setFiveId] = useState<number>();

  const getFivesFetch = useSupabase<FiveResponse[]>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .order("created_at", { ascending: false })
        .limit(4),
    true
  );

  const deleteFiveFetch = useSupabase<FiveResponse[]>(
    () => supabase.from("fives").delete().eq("id", fiveId),
    false
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    false
  );

  useEffect(() => {
    user && playerInfoFetch.executeFetch();
  }, [user]);

  useEffect(() => {
    getFivesFetch.response &&
      setFives(getFivesFetch.response.map((f) => new FiveModel(f)));
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

      <FiveHeader />
      <Five fives={fives} onRemoveFive={setFiveId} />

      <button
        onClick={() => showModal(Modals.NEW_FIVE_MODAL)}
        className="btn mt-3 w-full btn-sm rounded btn-primary"
      >
        Nouveau five
      </button>
    </div>
  );
};
