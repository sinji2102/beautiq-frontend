import { useModal } from "@hooks/useModal";

import * as S from "./AccountActions.styled";

const AccountActions = () => {
  const { modalOpen } = useModal();

  const handleClickLogout = () => {
    modalOpen({
      variant: "primary",
      type: "confirm",
      title: "로그아웃 하시겠어요?",
      comment: "로그아웃 후 서비스 사용 시 재로그인 해야 합니다.",
      //   TODO : okCallback 추가
    });
  };

  const handleClickWithdraw = () => {
    modalOpen({
      variant: "primary",
      type: "confirm",
      title: "정말 탈퇴하시겠어요?",
      comment: "탈퇴 시, 계정은 삭제되며 복구되지 않습니다.",
      //   TODO : okCallback 추가
    });
  };

  return (
    <S.ActionsWrapper>
      <S.ActionButton $type="logout" onClick={handleClickLogout}>
        로그아웃
      </S.ActionButton>
      <S.Divider />
      <S.ActionButton $type="withdraw" onClick={handleClickWithdraw}>
        탈퇴하기
      </S.ActionButton>
    </S.ActionsWrapper>
  );
};

export default AccountActions;
