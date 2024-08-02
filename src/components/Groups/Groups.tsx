import { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { Groups as GroupsModel, GroupsResponse } from "../../models/Groups";
import { supabase } from "../../supabase";
import { GroupsCards, GroupsCardsAddNew } from "../GroupsCard/GroupsCard";

export const Groups = () => {
  const [groups, setGroups] = useState<GroupsModel[]>([]);

  const getGroupsFetch = useSupabase<GroupsResponse[]>(
    () => supabase.from("groups").select("*"),
    true
  );

  useEffect(() => {
    getGroupsFetch.response &&
      setGroups(getGroupsFetch.response.map((g) => new GroupsModel(g)));
  }, [getGroupsFetch.response]);

  return (
    <div>
      <h2 className="mt-3 mb-1">Groupes</h2>

      <div className="flex items-center">
        <div className="flex w-full gap-3 mb-3 overflow-x-clip">
          {groups.map((g) => (
            <GroupsCards key={g.id} groupName={g.name} membersLenght={g.playersId.length} />
          ))}

          <GroupsCardsAddNew />
        </div>
      </div>
    </div>
  );
};
