import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { getTypography } from "../../../styles/typography";

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
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1rem;
  box-shadow: -0.6rem 0 2.4rem rgba(0, 0, 0, 0.08);
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
  justify-content: space-between;
  padding: 1.2rem 0.8rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .square {
    width: 4rem;
    height: 4rem;
    border-radius: 0.8rem;
    background: ${({ theme }) => theme.colors.gray[200]};
  }

  .logo {
    ${getTypography("heading1")}
    color: ${({ theme }) => theme.colors.primary[500]};
    letter-spacing: 0.2px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 4rem;
  line-height: 1;
  border: none;
  padding: 0 0.4rem 0 0;
  display: flex;
  justify-content: right;
`;

export const SectionRule = styled.div`
  height: 1px;
  background: #f6cfe0;
  margin: 0.4rem 1.6rem 0.6rem;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0 0.8rem;
  margin: 0;
  flex: 1;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.6rem 0.8rem;
  border-radius: 0.8rem;
  position: relative;

    ${getTypography("body1NormalMedi")}
    color: ${({ theme }) => theme.colors.primary[500]};
`;

export const Dot = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

export const DividerSpace = styled.div`
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.primary[200]};
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.6rem 2rem;
  margin-top: auto;
`;

export const UserBadge = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  background: #f08ab4;
`;

export const UserButton = styled.button`
  all: unset;
  ${getTypography("body1NormalMedi")}
  flex: 1;
  padding: 1rem 1.4rem;
  border-radius: 2rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.primary[500]};
  &.loggedIn {
    color: ${({ theme }) => theme.colors.primary[300]};
  } /* 로그인 상태 */
`;