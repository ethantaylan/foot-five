import { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { Groups as GroupsModel, GroupsResponse } from "../../models/Groups";
import { supabase } from "../../supabase";
import { GroupsCards, GroupsCardsAddNew } from "../GroupsCard/GroupsCard";
import { GroupInformationModal } from "../Modals/GoupInformationModal/GroupInformationModal";
import { showModal } from "../../utils/ShowModal";
import { Modals } from "../../constants/Modals";
import { NewGroupModal } from "../Modals/NewGroupModal/NewGroupModal";

export const Groups = () => {
  const [groups, setGroups] = useState<GroupsModel[]>([]);
  const [group, setGroup] = useState<GroupsModel>();

  const getGroupsFetch = useSupabase<GroupsResponse[]>(
    () => supabase.from("groups").select("*"),
    true
  );

  useEffect(() => {
    getGroupsFetch.response &&
      setGroups(getGroupsFetch.response.map((g) => new GroupsModel(g)));
  }, [getGroupsFetch.response]);

  return (
    <>
      <GroupInformationModal
        group={group || null}
        onConfirm={() => getGroupsFetch.executeFetch()}
        onDeleteGroupe={() => getGroupsFetch.executeFetch()}
      />
      <NewGroupModal onConfirm={() => getGroupsFetch.executeFetch()} />

      <h2 className="mt-3 mb-1">
        Groupes <span>{groups.length} / 3</span>
      </h2>

      <div className="flex items-center">
        <div className="flex w-full gap-3 mb-3 overflow-x-clip">
          {(groups || []).map((g) => (
            <GroupsCards
              onClick={() => {
                setGroup(g);
                showModal(Modals.GROUP_INFORMARION_MODAL);
              }}
              key={g.id}
              groupName={g.name}
              membersLenght={g.playersId?.length}
            />
          ))}

          {groups.length < 3 && <GroupsCardsAddNew />}
        </div>
      </div>
    </>
  );
};
