import { StoreApi, create } from "zustand";
import { Players } from "../models/Player";

interface PlayerInfoState {
  playerInfo: Players | null;
  isUserAlreadySubscribed: boolean | null;
}

interface PlayerInfoStateAction {
  setPlayerInfo: (playerInfo: Players | null) => void;
  setIsUserAlreadySubscribed: (isSubscribed: boolean | null) => void;
}

type PlayerInfoStore = PlayerInfoState & PlayerInfoStateAction;

export const usePlayerInfoStore = create<PlayerInfoStore>(
  (set: StoreApi<PlayerInfoStore>["setState"]) => ({
    playerInfo: null,
    isUserAlreadySubscribed: null,

    setPlayerInfo: (playerInfo) => set((state) => ({ ...state, playerInfo })),
    setIsUserAlreadySubscribed: (isSubscribed) =>
      set((state) => ({ ...state, isUserAlreadySubscribed: isSubscribed })),
  })
);
