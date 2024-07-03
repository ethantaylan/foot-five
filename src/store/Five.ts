import { StoreApi, create } from "zustand";
import { Five, Organizer } from "../models/Five";

interface FiveState {
  five: Five | null;
  organizer: Organizer | null;
}

interface FiveStateAction {
  setFive: (five: Five | null) => void;
  setOrganizer: (organizer: Organizer | null) => void;
}

type FiveStore = FiveState & FiveStateAction;

export const useFiveStore = create<FiveStore>(
  (set: StoreApi<FiveStore>["setState"]) => ({
    five: null,
    setFive: (five) => set((state) => ({ ...state, five })),

    organizer: null,
    setOrganizer: (organizer) => set((state) => ({ ...state, organizer })),
  })
);
