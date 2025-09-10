import React from "react";

import {
  BeautiqHeader,
  CloseButton,
  DividerSpace,
  Dot,
  NavItem,
  NavList,
  SectionRule,
  SidebarContainer,
  SidebarOverlay,
  UserArea,
  UserBadge,
  UserButton,
} from "./Sidebar.styled";

export interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName?: string;
  onClose: () => void;
  onLoginClick: () => void;
  onLogoutClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isLoggedIn,
  userName,
  onClose,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <SidebarContainer isOpen={isOpen} role="dialog" aria-modal="true" aria-label="메뉴">
        <CloseButton aria-label="닫기" onClick={onClose}>
            ×
          </CloseButton>
        <BeautiqHeader>
          <div className="brand">
            <div className="square" />
            <span className="logo">Beautiq</span>
          </div>
          
        </BeautiqHeader>

        <SectionRule />

        <NavList>
          <NavItem>
            <Dot />
            <span>피부 분석</span>
          </NavItem>
          <NavItem>
            <Dot />
            <span>메이크업 추천</span>
          </NavItem>

          {isLoggedIn && (
            <>
              <DividerSpace />
              <NavItem>
                <Dot />
                <span>히스토리</span>
              </NavItem>
              <NavItem>
                <Dot />
                <span>마이 페이지</span>
              </NavItem>
            </>
          )}
        </NavList>

        <UserArea>
          <UserBadge />
          {isLoggedIn ? (
            <UserButton className="loggedIn" onClick={onLogoutClick}>
              {userName || "사용자"}
            </UserButton>
          ) : (
            <UserButton onClick={onLoginClick}>로그인하기</UserButton>
          )}
        </UserArea>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
