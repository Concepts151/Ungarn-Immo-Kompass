import { create } from "zustand";

type State = {
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isSignupDetailModalOpen: boolean;
  isUploadImgModalOpen: boolean;
};

interface SessionState {
  userid: string | null;
  session: any;
  name: string;
  avatarUrl: string | null;
  setUserid: (id: any) => void;
  setSession: (session: any) => void;
  setName: (name: string) => void;
  setAvatarUrl: (url: string | null) => void;
  clearSession: () => void; // Add clearSession to the interface
}

export const useToggleModal = create<State>((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isSignupDetailModalOpen: false,
  isUploadImgModalOpen: false,
}));

export const useSessionStore = create<SessionState>((set) => ({
  userid: null,
  session: null,
  name: "User",
  avatarUrl: null,
  setUserid: (id) => set({ userid: id }),
  setSession: (session) => set({ session }),
  setName: (name) => set({ name }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  clearSession: () =>
    set({
      userid: null,
      session: null,
      name: "User",
      avatarUrl: null,
    }), // Reset session-related state
}));
