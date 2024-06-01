import { create } from "zustand";
import { Players } from "../models/Players";
import { Fives } from "../models/Fives";

type State = {
  players: Players[];
  // isUserAlreadySubscribed: boolean | null;
  // substitutePlayers: Players[];
  // fivePlace: string;
  // fiveDate: string;
  five: Fives | null;
  playerInfo: Players | null;
};

type Action = {
  setPlayers: (players: State["players"]) => void;
  // setPlayerIsAlreadySubscribed: (
  //   isSubscribed: State["isUserAlreadySubscribed"]
  // ) => void;
  // setSubstitutePlayers: (subtitutePlayers: State["substitutePlayers"]) => void;
  // setFivePlace: (place: State["fivePlace"]) => void;
  // setFiveDate: (date: State["fiveDate"]) => void;
  setFive: (five: State["five"]) => void;
  setPlayerInfo: (playerInfo: State['playerInfo']) => void;
};

export const useGlobalStore = create<State & Action>((set) => ({
  // isUserAlreadySubscribed: null,
  players: [],
  // substitutePlayers: [],
  // fiveDate: "",
  // fivePlace: "",
  five: null,
  playerInfo: null,
  setPlayerInfo: (playerInfo: Players | null) => set(() => ({ playerInfo })),
  setFive: (five: Fives | null) => set(() => ({ five })),
  // setFiveDate: (date: string) => set(() => ({ fiveDate: date })),
  // setFivePlace: (place: string) => set(() => ({ fivePlace: place })),
  setPlayers: (players: Players[]) => set(() => ({ players: players })),
  // setPlayerIsAlreadySubscribed: (isSubcribed: boolean | null) =>
  //   set(() => ({ isUserAlreadySubscribed: isSubcribed })),
  // setSubstitutePlayers: (players: Players[]) =>
  //   set(() => ({ substitutePlayers: players })),
}));
