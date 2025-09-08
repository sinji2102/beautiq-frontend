import type { ModalState } from "@custom-types/modalType";
import { create } from "zustand";

interface ModalStoreState extends ModalState {
  openModal: (
    props: Omit<ModalState, "isOpen" | "variant"> & {
      variant: ModalState["variant"];
      children?: React.ReactNode;
    }
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  variant: "primary",
  type: "alert",
  title: "",
  comment: undefined,
  okText: "",
  okCallback: undefined,
  noText: "",
  noCallback: undefined,
  closeOutside: false,

  openModal: (props) =>
    set({
      isOpen: true,
      ...props,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      comment: undefined,
      children: null,
      okText: "",
      okCallback: undefined,
      noText: "",
      noCallback: undefined,
      closeOutside: false,
    }),
}));
