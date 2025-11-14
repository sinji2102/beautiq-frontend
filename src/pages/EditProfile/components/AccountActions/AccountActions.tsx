import { deleteUser, postLogout } from "@apis/domain/user/api";
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
      okCallback: async () => {
        try {
          const response = await postLogout();

          if (response === null) {
            alert("로그아웃 요청에 실패했습니다.");
            return;
          }

          localStorage.removeItem("user");
          window.location.href = "/login";
        } catch (error) {
          console.error("로그아웃 처리 중 오류:", error);
          localStorage.removeItem("user");
          window.location.href = "/login";
          // alert("로그아웃 중 오류가 발생했습니다.");
        }
      },
    });
  };

  const handleClickWithdraw = () => {
    modalOpen({
      variant: "primary",
      type: "confirm",
      title: "정말 탈퇴하시겠어요?",
      comment: "탈퇴 시, 계정은 삭제되며 복구되지 않습니다.",
      okCallback: async () => {
        try {
          const response = await deleteUser();

          if (response === null) {
            alert("회원 탈퇴 요청에 실패했습니다.");
            return;
          }

          localStorage.removeItem("user");
          window.location.href = "/login";
        } catch (error) {
          console.error("회원 탈퇴 중 오류:", error);
          alert("회워 탈퇴 중 오류가 발생했습니다.");
        }
      },
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
