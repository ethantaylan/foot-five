import { create, StoreApi } from "zustand";

interface GlobalState {
  isDevEnv: boolean | null;
}

interface GlobalActions {
  setIsDevEnv: (env: boolean | null) => void;
}

type GlobalStore = GlobalState & GlobalActions;

export const useGlobalStore = create<GlobalStore>(
  (set: StoreApi<GlobalStore>["setState"]) => ({
    isDevEnv: null,
    setIsDevEnv: (env) => set((state) => ({ ...state, isDevEnv: env })),
  })
);
