import { useCallback, useEffect, useState } from "react";

import Sidebar from "../../components/commons/sidebar/Sidebar";
import { SidebarOverlay } from "../../components/commons/sidebar/Sidebar.styled";
import * as S from "./BPage.styled";

const BPage = () => {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // true면 로그인 후, false면 로그인 전

  const close = useCallback(() => setOpen(false), []);

  // ESC 닫기 + 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <S.Container>
      {/* 페이지 본문 */}
      <h1>ABOUT BEAUTIQ</h1>
      <p>추후 이미지 수정...</p>

      {/* 메뉴 버튼 */}
      <button onClick={() => setOpen(true)}>≡ 메뉴 열기</button>

      {/* 검정 오버레이 */}
      <SidebarOverlay isOpen={open} onClick={close} />

      {/* 사이드바 */}
      <Sidebar
        isOpen={open}
        isLoggedIn={loggedIn}
        userName="윤신지"
        onClose={close}
        onLoginClick={() => setLoggedIn(true)}
        onLogoutClick={() => setLoggedIn(false)}
      />
    </S.Container>
  );
};

export default BPage;
