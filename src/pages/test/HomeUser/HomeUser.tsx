import Sidebar from "@components/commons/sidebar/Sidebar";
import { SidebarOverlay } from "@components/commons/sidebar/Sidebar.styled";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

const Screen = styled.div`
  min-height: 100vh;
  background: #ffe6ef;
`;

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
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
  border: none;
  border-radius: 8px;
  background: #e91e63;
  color: #fff;
  font-weight: 700;
`;

const Main = styled.main`
  padding: 24px;
  color: #213547;
`;

const HomeUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

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
    <Screen>
      <Header>
        <Brand>Beautiq</Brand>
        <MenuBtn onClick={() => setOpen(true)}>≡</MenuBtn>
      </Header>

      <Main>
        <h1>ABOUT BEAUTIQ</h1>
        <p>로그인한 사용자용 영역...</p>
        {/* 로그인 사용자 전용 위젯/리스트 등 */}
      </Main>

      {/* 검정 오버레이 */}
      <SidebarOverlay isOpen={open} onClick={close} />

      {/* ⭐ 로그인 사이드바 (항목 4개 + 하단 사용자명) */}
      <Sidebar isOpen={open} userName="윤신지" onClose={close} />
    </Screen>
  );
};

export default HomeUser;
