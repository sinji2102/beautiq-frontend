import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

import * as S from "./Sidebar.styled";

export interface SidebarProps {
  isOpen: boolean;
  userName?: string;
  onClose: () => void;
}

const Sidebar = ({ isOpen, userName, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(isOpen);
  const close = useCallback(() => setOpen(false), []);

  // TODO : 로그인 연결하고 수정 필요
  const isLogin = false;

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

  const handleLoginClick = () => {
    // TODO : 로그인 버튼 연결
  };

  const handleLogoutClick = () => {
    // TODO : 로그인 버튼 연결
  };

  return (
    <Fragment>
      <S.SidebarOverlay isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <S.SidebarContainer isOpen={isOpen} role="dialog" aria-modal="true" aria-label="메뉴">
        <S.CloseWrapper>
          <S.CloseButton aria-label="닫기" onClick={onClose}>
            <S.CloseIcon />
          </S.CloseButton>
        </S.CloseWrapper>

        <S.BeautiqHeader>
          <div className="brand">
            <div className="square" />
            <span className="logo">Beautiq</span>
          </div>
        </S.BeautiqHeader>

        <S.DividerSpace />

        <S.NavList>
          <S.NavButton>
            <S.Dot />
            <span onClick={() => navigate("/skin")}>피부 분석</span>
          </S.NavButton>
          <S.NavButton>
            <S.Dot />
            <span onClick={() => navigate("/style")}>메이크업 추천</span>
          </S.NavButton>

          {isLogin && (
            <Fragment>
              <S.DividerSpace />
              <S.NavButton>
                <S.Dot />
                <span onClick={() => navigate("/tracking")}>히스토리</span>
              </S.NavButton>
              <S.NavButton>
                <S.Dot />
                <span onClick={() => navigate("/my")}>마이 페이지</span>
              </S.NavButton>
            </Fragment>
          )}
        </S.NavList>

        <S.UserArea>
          <S.UserBadge />
          {isLogin ? (
            <S.UserButton className="loggedIn" onClick={handleLogoutClick}>
              {userName || "사용자"}
            </S.UserButton>
          ) : (
            <S.UserButton onClick={handleLoginClick}>로그인하기</S.UserButton>
          )}
        </S.UserArea>
      </S.SidebarContainer>
    </Fragment>
  );
};

export default Sidebar;
