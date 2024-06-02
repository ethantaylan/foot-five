import { create } from "zustand";
import { Players } from "../models/Players";
import { Fives } from "../models/Fives";

type State = {
  players: Players[];
  isUserAlreadySubscribed: boolean | null;
  five: Fives | null;
  playerInfo: Players | null;
  isUserAdmin: boolean | null;
};

type Action = {
  setPlayers: (players: State["players"]) => void;
  setPlayerIsAlreadySubscribed: (
    isSubscribed: State["isUserAlreadySubscribed"]
  ) => void;
  setFive: (five: State["five"]) => void;
  setPlayerInfo: (playerInfo: State["playerInfo"]) => void;
  setIsUserAdmin: (user: State["isUserAdmin"]) => void;
};

export const useGlobalStore = create<State & Action>((set) => ({
  isUserAdmin: null,
  isUserAlreadySubscribed: null,
  players: [],
  five: null,
  playerInfo: null,

  setIsUserAdmin: (isAdmin: boolean | null) =>
    set(() => ({ isUserAdmin: isAdmin })),
  setPlayerInfo: (playerInfo: Players | null) => set(() => ({ playerInfo })),
  setFive: (five: Fives | null) => set(() => ({ five })),
  setPlayers: (players: Players[]) => set(() => ({ players: players })),
  setPlayerIsAlreadySubscribed: (isSubcribed: boolean | null) =>
    set(() => ({ isUserAlreadySubscribed: isSubcribed })),
}));
