import { IconBack, IconBeautiq, IconClose, IconHamburger } from "@assets/svgs";
import styled from "@emotion/styled";

import { getTypography } from "../../../styles/typography";

// 헤더 전체 래퍼
export const HeaderWrapper = styled.div`
  ${getTypography("heading3")};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.primary[500]};

  width: 100%;
  height: 5.6rem; /* 56px */
  padding: 1.2rem; /* 12px */

  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const IconButton = styled.button`
  all: unset;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

// 뒤로가기 아이콘
export const BackIcon = styled(IconBack)`
  width: 3.2rem; /* 32px */
  height: 3.2rem; /* 32px */
  fill: ${({ theme }) => theme.colors.primary[100]};
`;

// 메인 로고
export const BeautiqIcon = styled(IconBeautiq)`
  width: 8.2rem; /* 82px */
  height: 3.2rem; /* 32px */
  fill: ${({ theme }) => theme.colors.primary[100]};
`;

// 햄버거 아이콘
export const HamburgerIcon = styled(IconHamburger)`
  width: 3.2rem; /* 32px */
  height: 3.2rem; /* 32px */
  fill: ${({ theme }) => theme.colors.primary[100]};
`;

// 닫기 아이콘 -> 다른 아이콘과 크기 맞추기 위해 패딩 추가
export const CloseIcon = styled(IconClose)`
  width: 2.4rem; /* 24px */
  height: 2.4rem; /* 24px */
  padding: 0.4rem; /* 4px */
  fill: ${({ theme }) => theme.colors.primary[100]};
`;

// 빈공간 아이콘
export const PlaceholderIcon = styled.div`
  width: 3.2rem; /* 32px */
  height: 3.2rem; /* 32px */
`;
