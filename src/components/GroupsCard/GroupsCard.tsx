import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Modals } from "../../constants/Modals";
import { showModal } from "../../utils/ShowModal";

export interface GroupsCards {
  groupName: string;
  membersLenght: number;
}

export const GroupsCards = ({ groupName, membersLenght }: GroupsCards) => {
  return (
    <div className="card cursor-pointer hover:scale-105 bg-base-100 bg-opacity-85 min-w-32 shadow-md">
      <div className="flex items-center pt-2 justify-center">
        <span className="text-2xl p-3 font-bold bg-lime-100 rounded-full text-lime-500">
          {groupName.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="p-2 pt-0 items-center text-center">
        <div className="flex items-center justify-center flex-col">
          <h3>{groupName}</h3>
          <small className="text-neutral-500">{membersLenght} membres</small>
        </div>
      </div>
    </div>
  );
};

export const GroupsCardsAddNew = () => {
  return (
    <div
      onClick={() => showModal(Modals.NEW_GROUP_MODAL)}
      className="card cursor-pointer hover:scale-105 bg-base-100 bg-opacity-85 min-w-32 shadow-md"
    >
      <div className="flex items-center pt-2 justify-center">
        <span className="text-4xl p-3 mb-1 font-bold bg-neutral-100 rounded-full text-neutral-400">
          <PlusCircleIcon height={40} />
        </span>
      </div>
      <div className="p-2 pt-0 items-center text-center">
        <h3>Nouveau</h3>
      </div>
    </div>
  );
};
