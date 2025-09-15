import Button from "@components/commons/button/Button";
import { useModalStore } from "@stores/modalStore";
import { useRef } from "react";

import * as S from "./Modal.styled";

const Modal = () => {
  const {
    isOpen,
    title,
    comment,
    variant,
    type,
    children,
    okText,
    okCallback,
    noText,
    noCallback,
    closeModal,
    closeOutside,
  } = useModalStore();

  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    okCallback?.();
    closeModal();
  };

  const handleCancel = () => {
    noCallback?.();
    closeModal();
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const renderContent = () => {
    switch (type) {
      case "custom":
        return <>{children}</>;

      case "alert":
        return (
          <>
            <S.ContentBox>
              <S.Title>{title}</S.Title>
              {comment && <S.Comment>{comment}</S.Comment>}
            </S.ContentBox>
            <S.ButtonBox>
              <Button size="large" variant={variant} onClick={handleConfirm}>
                {okText || "확인"}
              </Button>
            </S.ButtonBox>
          </>
        );

      case "confirm":
        return (
          <>
            <S.ContentBox>
              <S.Title>{title}</S.Title>
              {comment && <S.Comment>{comment}</S.Comment>}
            </S.ContentBox>
            <S.ButtonBox>
              <Button
                size="small"
                variant={variant}
                isInactive={variant !== "line"}
                onClick={handleCancel}
              >
                {noText || "취소"}
              </Button>

              <Button
                size="small"
                variant={variant === "line" ? "modal" : variant}
                onClick={handleConfirm}
              >
                {okText || "확인"}
              </Button>
            </S.ButtonBox>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <S.ModalWrapper onClick={closeOutside ? handleClickOutside : undefined}>
      <S.ModalContainer ref={containerRef}>{renderContent()}</S.ModalContainer>
    </S.ModalWrapper>
  );
};

export default Modal;
