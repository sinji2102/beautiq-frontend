import { Fragment } from "react/jsx-runtime";

import * as S from "./Sidebar.styled";

export interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName?: string;
  onClose: () => void;
  onLoginClick: () => void;
  onLogoutClick?: () => void;
}

const Sidebar = ({
  isOpen,
  isLoggedIn,
  userName,
  onClose,
  onLoginClick,
  onLogoutClick,
}: SidebarProps) => {
  return (
    <Fragment>
      <S.SidebarOverlay isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <S.SidebarContainer isOpen={isOpen} role="dialog" aria-modal="true" aria-label="메뉴">
        <S.CloseButton aria-label="닫기" onClick={onClose}>
          X
        </S.CloseButton>

        <S.BeautiqHeader>
          <div className="brand">
            <div className="square" />
            <span className="logo">Beautiq</span>
          </div>
        </S.BeautiqHeader>

        <S.SectionRule />

        <S.NavList>
          <S.NavButton>
            <S.Dot />
            <span>피부 분석</span>
          </S.NavButton>
          <S.NavButton>
            <S.Dot />
            <span>메이크업 추천</span>
          </S.NavButton>

          {isLoggedIn && (
            <Fragment>
              <S.DividerSpace />
              <S.NavButton>
                <S.Dot />
                <span>히스토리</span>
              </S.NavButton>
              <S.NavButton>
                <S.Dot />
                <span>마이 페이지</span>
              </S.NavButton>
            </Fragment>
          )}
        </S.NavList>

        <S.UserArea>
          <S.UserBadge />
          {isLoggedIn ? (
            <S.UserButton className="loggedIn" onClick={onLogoutClick}>
              {userName || "사용자"}
            </S.UserButton>
          ) : (
            <S.UserButton onClick={onLoginClick}>로그인하기</S.UserButton>
          )}
        </S.UserArea>
      </S.SidebarContainer>
    </Fragment>
  );
};

export default Sidebar;
