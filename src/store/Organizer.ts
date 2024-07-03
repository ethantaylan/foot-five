import { StoreApi, create } from "zustand";
import { Organizer } from "../models/Five";

interface OrganizerState {
  organizer: Organizer | null;
}

interface OrganizerStateAction {
  setOrganizer: (organizer: Organizer | null) => void;
}

type OrganizerStore = OrganizerState & OrganizerStateAction;

export const useOrganizerStore = create<OrganizerStore>(
  (set: StoreApi<OrganizerStore>["setState"]) => ({
    organizer: null,
    setOrganizer: (organizer) => set((state) => ({ ...state, organizer })),
  })
);
