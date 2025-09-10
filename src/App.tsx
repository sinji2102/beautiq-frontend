import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "./components/commons/sidebar/Sidebar";
import { SidebarOverlay } from "./components/commons/sidebar/Sidebar.styled";

const AppContainer = styled.div`
  min-height: 100vh;
  background: #ffe6ef; /* ✅ 페이지 배경 핑크 */
`;

const Header = styled.header`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1e3ea;
`;
const Brand = styled.div`
  font-weight: 800;
  font-size: 18px;
  color: #e45c9c;
`;
const MenuBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #e91e63;
  color: #fff;
  font-weight: 700;
`;

const Main = styled.main`
  padding: 24px;
  color: #213547;
`;

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // ESC 닫기 + 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AppContainer>
      <Header>
        <Brand>Beautiq</Brand>
        <MenuBtn onClick={() => setIsOpen(true)}>≡</MenuBtn>
      </Header>

      <Main>
        <h1>메인</h1>
        <p>오른쪽 상단 버튼을 누르면 사이드바가 열려요.</p>
      </Main>

      {/* 오버레이 (검정) */}
      <SidebarOverlay isOpen={isOpen} onClick={close} />

      {/* 사이드바 (오른쪽) */}
      <Sidebar
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        userName="윤신지"
        onClose={close}
        onLoginClick={() => setIsLoggedIn(true)}
        onLogoutClick={() => setIsLoggedIn(false)}
      />
    </AppContainer>
  );
};
export default App;
