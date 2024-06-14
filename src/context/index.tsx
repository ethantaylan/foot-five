import { create, StoreApi } from "zustand";
import { Players } from "../models/Player";
import { Five, Organizer } from "../models/Five";

interface GlobalState {
  isUserAdmin: boolean | null;
  isUserAlreadySubscribed: boolean | null;
  players: Players[];
  five: Five | null;
  playerInfo: Players | null;
  organizer: Organizer | null;
}

interface GlobalActions {
  setIsUserAdmin: (isAdmin: boolean | null) => void;
  setPlayerInfo: (playerInfo: Players | null) => void;
  setFive: (five: Five | null) => void;
  setPlayers: (players: Players[]) => void;
  setPlayerIsAlreadySubscribed: (isSubscribed: boolean | null) => void;
  setOrganizer: (organizer: Organizer | null) => void;
}

type GlobalStore = GlobalState & GlobalActions;

export const useGlobalStore = create<GlobalStore>(
  (set: StoreApi<GlobalStore>["setState"]) => ({
    isUserAdmin: null,
    isUserAlreadySubscribed: null,
    players: [],
    five: null,
    playerInfo: null,
    organizer: null,

    setOrganizer: (organizer) => set((state) => ({ ...state, organizer })),
    setIsUserAdmin: (isAdmin) =>
      set((state) => ({ ...state, isUserAdmin: isAdmin })),
    setPlayerInfo: (playerInfo) => set((state) => ({ ...state, playerInfo })),
    setFive: (five) => set((state) => ({ ...state, five })),
    setPlayers: (players) => set((state) => ({ ...state, players })),
    setPlayerIsAlreadySubscribed: (isSubscribed) =>
      set((state) => ({ ...state, isUserAlreadySubscribed: isSubscribed })),
  })
);
