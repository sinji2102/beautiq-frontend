import styled, { css } from "styled-components";

/* 검정 오버레이 */
export const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  inset: 0;
  background: rgba(0, 0, 0, 0.45); /* ✅ 검정 반투명 */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 90;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

/* 오른쪽 사이드바 패널 */
export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: -28rem; /* ✅ 오른쪽 고정 */
  width: 28rem;
  height: 100vh;
  background: #ffe6ef; /* 연분홍 패널 */
  display: flex;
  flex-direction: column;
  padding: 12px 0 20px;
  box-shadow: -6px 0 24px rgba(0, 0, 0, 0.08);
  transform: translateX(${(p) => (p.isOpen ? "0" : "100%")}); /* ✅ 오른쪽→왼쪽 슬라이드 */
  transition: transform 0.28s ease-in-out;
  z-index: 100;
  visibility: hidden;

  ${({ isOpen }) =>
    isOpen &&
    css`
      right: 0;
      visibility: visible;
    `}
`;

/* 헤더 */
export const BeautiqHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px 10px;
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .square {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: #d8d8d8;
  }
  .logo {
    font-weight: 800;
    font-size: 18px;
    color: #e45c9c;
    letter-spacing: 0.2px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  color: #e28db3;
  font-size: 26px;
  line-height: 1;
`;

export const SectionRule = styled.div`
  height: 1px;
  background: #f6cfe0;
  margin: 4px 16px 6px;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0 8px;
  margin: 0;
  flex: 1;
`;
export const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  position: relative;
  & + &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 12px;
    right: 12px;
    height: 1px;
    background: #f1c7da; /* 항목 사이 얇은 라인 */
  }
  span {
    font-size: 14px;
    color: #6f5d67;
  }
`;
export const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #e9dbe3;
`;

export const DividerSpace = styled.div`
  height: 8px;
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 20px;
  margin-top: auto;
`;
export const UserBadge = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f08ab4;
`;
export const UserButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background: #e91e63; /* 로그인하기 버튼 */
  &.loggedIn {
    background: #e6b2d1;
    color: #6f5d67;
  } /* 로그인 상태 */
`;
