import { readUserSession } from "@/utils/action";
import { create } from "zustand";

type State = {
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
};
interface SessionState {
  session: any; // Use the proper type if you want
  name: string | null;
  setSession: (session: any) => void;
  setName: (session: any) => void;
  clearSession: () => void;
}

export const useToggleModal = create<State>((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
}));

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  name: "userrrr",
  setSession: (session) => set({ session }),
  setName: (name) => set({ name }),
  clearSession: () => set({ session: null }),
}));
