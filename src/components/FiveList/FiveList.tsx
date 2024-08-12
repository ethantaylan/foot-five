import { FC, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { showModal } from "../../utils/ShowModal";
import { NewFiveModal } from "../Modals/NewFiveModal/NewFiveModal.tsx";
import { Players, PlayersResponse } from "../../models/Player.ts";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "../Spinner/Spinner.tsx";
import { Modals } from "../../constants/Modals.ts";
import FiveHeader from "../FiveHeader/FiveListHeader.tsx";
import { FiveResponse, Five as FiveModel } from "../../models/Five.ts";
import { Five } from "../Five/Five.tsx";
import { usePlayerInfoStore } from "../../store/PlayerInfo.ts";
import { useSupabase } from "../../hooks/useSupabase.ts";
import { JoinGroupModal } from "../Modals/JoinGroupModal/JoinGroupModal.tsx";
import { Groups } from "../Groups/Groups.tsx";
import { GroupsResponse } from "../../models/Groups.ts";
import { Groups as GroupsModel } from "../../models/Groups.ts";
import { GroupInformationModal } from "../Modals/GoupInformationModal/GroupInformationModal.tsx";
import { NewGroupModal } from "../Modals/NewGroupModal/NewGroupModal.tsx";
import { useGroupsStore } from "../../store/GroupsStore.ts";
import { useNavigate } from "react-router-dom";

export const FiveList: FC = () => {
  const { setPlayerInfo } = usePlayerInfoStore();
  const { setSelectedGroup } = useGroupsStore();
  const { user } = useUser();
  const [fives, setFives] = useState<FiveModel[]>([]);
  const [fiveId, setFiveId] = useState<number>();
  const [groups, setGroups] = useState<GroupsModel[]>([]);
  const navigate = useNavigate();

  const getFivesFetch = useSupabase<FiveResponse[]>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .order("created_at", { ascending: false })
        .limit(4),
    false
  );

  const deleteFiveFetch = useSupabase<FiveResponse[]>(
    () => supabase.from("fives").delete().eq("id", fiveId),
    false
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    false
  );

  const getGroupsFetch = useSupabase<GroupsResponse[]>(
    () => supabase.from("groups").select("*"),
    false
  );

  useEffect(() => {
    getFivesFetch.executeFetch();
    getGroupsFetch.executeFetch();
  }, []);

  useEffect(() => {
    if (getGroupsFetch.response) {
      setGroups(getGroupsFetch.response.map((g) => new GroupsModel(g)));
    }
  }, [getGroupsFetch.response]);

  useEffect(() => {
    groups && setSelectedGroup(groups[0]);
  }, [groups]);

  useEffect(() => {
    user && playerInfoFetch.executeFetch();
  }, [user]);

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayerInfo(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  useEffect(() => {
    getFivesFetch.response &&
      setFives(getFivesFetch.response.map((f) => new FiveModel(f)));
  }, [getFivesFetch.response]);

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
      <NewFiveModal
        onConfirm={() => {
          getFivesFetch.executeFetch();
          getGroupsFetch.executeFetch();
        }}
        groups={groups}
      />
      <JoinGroupModal />
      <GroupInformationModal
        onConfirm={() => getGroupsFetch.executeFetch()}
        onDeleteGroupe={() => getGroupsFetch.executeFetch()}
      />
      <NewGroupModal onConfirm={() => getGroupsFetch.executeFetch()} />
      <Groups groups={groups} onGroupClick={setSelectedGroup} />
      <FiveHeader />
      <Five fives={fives} onRemoveFive={setFiveId} />

      <button
        onClick={() => showModal(Modals.NEW_FIVE_MODAL)}
        className="btn mt-3 rounded btn-secondary"
      >
        Nouveau five
      </button>

      <button
        onClick={() => navigate("/groups")}
        className="btn mt-3 w-full btn-outline rounded btn-primary"
      >
        Rejoindre un groupe
      </button>
    </div>
  );
};
