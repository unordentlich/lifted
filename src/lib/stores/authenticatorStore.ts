'use strict';
import { User } from "@/types/User";
import { create } from "zustand";

interface UserState {
  user: User | any | null;
  setUser: (user: User) => void;
}

export const useStore = create<UserState>()(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }
  )
);