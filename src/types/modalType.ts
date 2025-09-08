export interface ModalState {
  isOpen: boolean;
  variant?: "primary" | "line";
  type: "alert" | "confirm" | "custom";
  title: string;
  comment?: string;
  children?: React.ReactNode;
  okText?: string;
  okCallback?: () => void;
  noText?: string;
  noCallback?: () => void;
  closeOutside?: boolean;
}
