import { create } from "zustand";
import { Players } from "../models/Players";

type State = {
  players: Players[];
  isUserAlreadySubscribed: boolean | null;
  substitutePlayers: Players[];
};

type Action = {
  setPlayers: (players: State["players"]) => void;
  setPlayerIsAlreadySubscribed: (
    isSubscribed: State["isUserAlreadySubscribed"]
  ) => void;
  setSubstitutePlayers: (subtitutePlayers: State["substitutePlayers"]) => void;
};

export const useGlobalStore = create<State & Action>((set) => ({
  isUserAlreadySubscribed: null,
  players: [],
  substitutePlayers: [],

  setPlayers: (players: Players[]) => set(() => ({ players: players })),
  setPlayerIsAlreadySubscribed: (isSubcribed: boolean | null) =>
    set(() => ({ isUserAlreadySubscribed: isSubcribed })),
  setSubstitutePlayers: (players: Players[]) =>
    set(() => ({ substitutePlayers: players })),
}));
