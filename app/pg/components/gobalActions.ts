import { useToggleModal } from "@/app/store";

export const setOpenLoginModal = (bool: boolean) => {
  useToggleModal.setState({ isLoginModalOpen: bool });
};
export const setOpenSignupModal = (bool: boolean) => {
  useToggleModal.setState({ isSignupModalOpen: bool });
};

export const switchToLoginModal = () => {
  useToggleModal.setState({ isSignupModalOpen: false });
  useToggleModal.setState({ isLoginModalOpen: true });
};
export const switchToSignupModal = () => {
  useToggleModal.setState({ isLoginModalOpen: false });
  useToggleModal.setState({ isSignupModalOpen: true });
};
