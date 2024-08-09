import { GroupsCards, GroupsCardsAddNew } from "../GroupsCard/GroupsCard";
import { showModal } from "../../utils/ShowModal";
import { Modals } from "../../constants/Modals";
import { Groups as GroupsModel } from "../../models/Groups";

export interface GroupsProps {
  groups: GroupsModel[];
  onGroupClick: (group: GroupsModel) => void;
}

export const Groups = ({ groups, onGroupClick }: GroupsProps) => {
  return (
    <>
      <h2 className="mt-3 mb-1">
        Groupes <span>{groups.length} / 3</span>
      </h2>

      <div className="flex items-center">
        <div className="flex w-full gap-3 mb-3 overflow-x-clip">
          {(groups || []).map((g) => (
            <GroupsCards
              onClick={() => {
                onGroupClick(g);
                showModal(Modals.GROUP_INFORMARION_MODAL);
              }}
              key={g.id}
              groupName={g.name}
              membersLenght={g.playersId?.length}
              fives={g.fivesId?.length}
            />
          ))}

          {groups.length < 3 && <GroupsCardsAddNew />}
        </div>
      </div>
    </>
  );
};
