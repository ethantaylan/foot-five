import { StoreApi, create } from "zustand";
import { Groups } from "../models/Groups";

interface GroupsState {
  selectedGroup: Groups | null;
}

interface GroupsAction {
  setSelectedGroup: (group: Groups | null) => void;
}

type GroupsStore = GroupsState & GroupsAction;

export const useGroupsStore = create<GroupsStore>(
  (set: StoreApi<GroupsStore>["setState"]) => ({
    selectedGroup: null,
    setSelectedGroup: (group) =>
      set((state) => ({ ...state, selectedGroup: group })),
  })
);
