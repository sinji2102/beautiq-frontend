import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Sidebar from "../../components/commons/sidebar/Sidebar";
import { SidebarOverlay } from "../../components/commons/sidebar/Sidebar.styled";

const Screen = styled.div`
  min-height: 100vh;
  background: #ffe6ef; /* 앱같은 핑크 배경 */
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

const HomeGuest: React.FC = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // ESC로 닫기 + 스크롤 잠금
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
        <p>추후 이미지 수정...</p>
        {/* 여기에 카드/섹션 등 메인 컨텐츠 */}
      </Main>

      {/* 검정 오버레이 */}
      <SidebarOverlay isOpen={open} onClick={close} />

      {/* ⭐ 비로그인 사이드바 (항목 2개 + 하단 "로그인하기") */}
      <Sidebar
        isOpen={open}
        isLoggedIn={false}
        onClose={close}
        onLoginClick={() => {
          // 필요하면 여기서 라우팅으로 로그인 후 페이지로 이동
          // e.g. navigate('/home-user')
          close();
        }}
      />
    </Screen>
  );
};

export default HomeGuest;
