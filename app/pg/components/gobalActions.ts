import { useSessionStore, useToggleModal } from "@/app/store";

export const setOpenLoginModal = (bool: boolean) => {
  useToggleModal.setState({ isLoginModalOpen: bool });
};
export const setOpenSignupModal = (bool: boolean) => {
  useToggleModal.setState({ isSignupModalOpen: bool });
};
export const setOpenSignupDetailModal = (bool: boolean) => {
  useToggleModal.setState({ isSignupDetailModalOpen: bool });
};

export const setOpenOtpModal = (bool: boolean) => {
  useToggleModal.setState({ isSignupOtpModalOpen: bool });
};
export const setOpenAvatarModal = (bool: boolean) => {
  useToggleModal.setState({ isUploadImgModalOpen: bool });
};
export const setAvatarUrl = (url: string) => {
  useSessionStore.setState({ avatarUrl: url });
};

export const switchToLoginModal = () => {
  useToggleModal.setState({ isSignupModalOpen: false });
  useToggleModal.setState({ isLoginModalOpen: true });
};

export const switchToSignupModal = () => {
  useToggleModal.setState({ isLoginModalOpen: false });
  useToggleModal.setState({ isSignupModalOpen: true });
};

