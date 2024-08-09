import { StoreApi, create } from "zustand";

interface AdminState {
  isUserAdmin: boolean | null;
}

interface AdminAction {
  setIsUserAdmin: (isAdmin: boolean | null) => void;
}

type AdminStore = AdminState & AdminAction;

export const useAdminStore = create<AdminStore>(
  (set: StoreApi<AdminStore>["setState"]) => ({
    isUserAdmin: null,
    setIsUserAdmin: (isAdmin) =>
      set((state) => ({ ...state, isUserAdmin: isAdmin })),
  })
);
