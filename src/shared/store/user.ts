import { create } from "zustand";
import { UserType } from "../models/user";
import { removeFromSessionStorage, saveInSessionStorage } from "../utils";

interface UserStore {
  user: UserType | null;
  token: string;
  handleSetUser: (user: UserType) => void;
  handleLogout: () => void;
  handleSetToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: "",
  handleSetUser: (user: UserType) => set({ user }),
  handleLogout: () => {
    set({ user: null, token: "" });
    removeFromSessionStorage("token");
  },
  handleSetToken: (token: string) => {
    saveInSessionStorage("token", token);
    set({ token });
  },
}));
