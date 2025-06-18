import { create } from "zustand"

type State = {
  isLoginModalOpen: boolean
  isSignupModalOpen: boolean
  isSignupDetailModalOpen: boolean
  isUploadImgModalOpen: boolean
}
interface SessionState {
  userid: any // Use the proper type if you want
  session: any // Use the proper type if you want
  name: string | null
  avatarUrl: String | null
  setSession: (session: any) => void
  setName: (name: any) => void
  setUserId: (name: any) => void
  setAvatarUrl: (url: any) => void
  clearSession: () => void
}

export const useToggleModal = create<State>((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isSignupDetailModalOpen: false,
  isUploadImgModalOpen: false,
}))

export const useSessionStore = create<SessionState>((set) => ({
  userid:null,
  session: null,
  name: "user",
  avatarUrl: null,
  setSession: (session) => set({ session }),
  setName: (name) => set({ name }),
  setUserId: (userid) => set({ userid }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  clearSession: () => set({ session: null }),
}))
