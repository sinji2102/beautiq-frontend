import Button from "@components/commons/button/Button";
import { useModalStore } from "@stores/modalStore";

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
  } = useModalStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    okCallback?.();
    closeModal();
  };

  const handleCancel = () => {
    noCallback?.();
    closeModal();
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
              {variant === "line" ? (
                <>
                  <Button size="small" variant={variant} onClick={handleCancel}>
                    {noText || "취소"}
                  </Button>
                  <Button size="small" variant="modal" onClick={handleConfirm}>
                    {okText || "확인"}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" variant={variant} isInactive onClick={handleCancel}>
                    {noText || "취소"}
                  </Button>
                  <Button size="small" variant={variant} onClick={handleConfirm}>
                    {okText || "확인"}
                  </Button>
                </>
              )}
            </S.ButtonBox>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <S.ModalWrapper>
      <S.ModalContainer>{renderContent()}</S.ModalContainer>
    </S.ModalWrapper>
  );
};

export default Modal;
