import { IconClose } from "@assets/svgs";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 90;

  background: rgb(0 0 0 / 45%);
  opacity: 0;

  transition: opacity 0.25s ease;

  pointer-events: none;

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;

      pointer-events: auto;
    `}
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0; /* ✅ 오른쪽 고정 */
  z-index: 100;
  display: flex;
  flex-direction: column;

  /* TODO : 화면 양옆으로 늘어나는 거 수정 */

  width: 25.6rem;
  height: 100dvh;
  padding: 2.4rem 1rem;

  background-color: ${({ theme }) => theme.colors.neutral[100]};
  box-shadow: -0.6rem 0 2.4rem rgb(0 0 0 / 8%);
  transform: translateX(${(p) => (p.isOpen ? "0" : "100%")}); /* ✅ 오른쪽→왼쪽 슬라이드 */
  visibility: ${(p) => (p.isOpen ? "visible" : "hidden")};

  transition:
    transform 0.28s ease-in-out,
    visibility 0.28s ease-in-out;
`;

export const BeautiqHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 0.8rem;

  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .square {
    width: 4rem;
    height: 4rem;

    background: ${({ theme }) => theme.colors.gray[200]};
    border-radius: 0.8rem;
  }

  .logo {
    ${getTypography("heading1")}
    color: ${({ theme }) => theme.colors.primary[500]};
    letter-spacing: 0.2px;
  }
`;

export const CloseWrapper = styled.div`
  all: unset;
  display: flex;
  justify-content: right;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: right;
  padding: 0 0.4rem 0 0;

  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 4rem;
  line-height: 1;
  all: unset;
`;

// 닫기 아이콘 -> 다른 아이콘과 크기 맞추기 위해 패딩 추가
export const CloseIcon = styled(IconClose)`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;

  fill: ${({ theme }) => theme.colors.primary[100]};
`;

export const NavList = styled.ul`
  flex: 1;
  margin: 0;
  padding: 0 0.8rem;

  list-style: none;
`;

export const NavButton = styled.button`
  all: unset;
  position: relative;

  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 1.6rem 0.8rem;

  color: ${({ theme }) => theme.colors.primary[500]};

  border-radius: 0.8rem;

  ${getTypography("body1NormalMedi")}
`;

export const Dot = styled.div`
  width: 2.8rem;
  height: 2.8rem;

  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 0.8rem;
`;

export const DividerSpace = styled.div`
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.primary[200]};
`;

export const UserArea = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 2.4rem;
  padding: 0.8rem 1.6rem 2rem;
`;

export const UserBadge = styled.div`
  width: 4.4rem;
  height: 4.4rem;

  background: ${({ theme }) => theme.colors.primary[300]};
  border-radius: 50%;
`;

export const UserButton = styled.button`
  all: unset;
  ${getTypography("body1NormalMedi")}
  flex: 1;
  padding: 1rem 1.4rem;

  color: ${({ theme }) => theme.colors.primary[500]};
  text-align: left;

  border-radius: 2rem;

  .loggedIn {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;
