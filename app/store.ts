import { create } from "zustand";

type State = {
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isSignupDetailModalOpen: boolean;
  isUploadImgModalOpen: boolean;
};

interface SessionState {
  session: any;
  name: string;
  avatarUrl: string | null;
  setSession: (session: any) => void;
  setName: (name: string) => void;
  setAvatarUrl: (url: string | null) => void;
}

export const useToggleModal = create<State>((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isSignupDetailModalOpen: false,
  isUploadImgModalOpen: false,
}));

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  name: "User",
  avatarUrl: null,
  setSession: (session) => set({ session }),
  setName: (name) => set({ name }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));
