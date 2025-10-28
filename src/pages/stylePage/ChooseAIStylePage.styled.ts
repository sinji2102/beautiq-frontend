import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import { IconCam as RawCamIcon, IconClose as RawCloseIcon } from "../../assets/svgs";

/** 선택 테두리 공통 스타일 */
const selectedRing = ({ theme }: { theme: Theme }) =>
  `0 0 0 3px ${theme.colors.primary[400]} inset, 0 0 0 2px ${theme.colors.primary[500]}`;

export const Screen = styled.div`
  /* 헤더(5.6rem)를 제외한 화면 높이 사용 */
  height: calc(100dvh - 5.6rem);
  background: ${({ theme }) => theme.colors.neutral[0]};
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.header`
  height: 5.6rem;
  background: ${({ theme }) => theme.colors.primary[100]};
  display: grid;
  grid-template-columns: 5.6rem 1fr 5.6rem;
  align-items: center;

  .back {
    margin: 0 0.8rem;
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.primary[700]};
    font-size: 1.8rem;
    font-weight: 700;
    cursor: pointer;
  }

  .title {
    text-align: center;
    color: ${({ theme }) => theme.colors.primary[700]};
    ${getTypography("body1NormalSemi")}
  }

  .spacer {
    width: 4rem;
    height: 4rem;
  }
`;

export const Body = styled.main`
  flex: 1;

  /* ✅ 위/아래 118px 여백 (= 11.8rem) */
  padding: 11.8rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem; /* 안내문과 그리드 간격 */
`;

export const GuideText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
  ${getTypography("body2Long")}
`;

/* ✅ 타일 고정 사이즈 131px × 131px, 2×2 그리드 */
export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 13.1rem); /* 131px */
  grid-auto-rows: 13.1rem;
  gap: 1.4rem;
  justify-content: center;
`;

const Square = styled.div`
  width: 13.1rem;
  height: 13.1rem;
  border-radius: 1.6rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;

/** URL 타일 (선택 시 외곽선 표시) */
export const UrlTile = styled(Square)<{ selected?: boolean }>`
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  box-shadow: ${({ selected, theme }) =>
    selected ? selectedRing({ theme }) : "none"};
  outline: none;

  &:focus-visible {
    box-shadow: ${({ theme }) => selectedRing({ theme })};
  }
`;

/** 업로드 타일 (핑크 + 카메라 / 프리뷰 + 삭제 버튼 포함) */
export const PinkUploadTile = styled(Square)<{ selected?: boolean }>`
  background: ${({ theme }) => theme.colors.primary[100]};
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.2s ease;

  box-shadow: ${({ selected, theme }) =>
    selected ? selectedRing({ theme }) : "none"};
  outline: none;

  &:focus-visible {
    box-shadow: ${({ theme }) => selectedRing({ theme })};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
  }

  &.hasImage {
    background: transparent;
    img {
      display: block;
    }

    svg {
      display: none;
    }
  }

  .remove {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    border: none;
    background: #ffffffcc;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:focus-visible {
      outline: 0.2rem solid ${({ theme }) => theme.colors.primary[400]};
      outline-offset: 0.2rem;
    }
  }
`;

export const CamIcon = styled(RawCamIcon)`
  width: 6.2rem;
  height: 5.6rem;
`;

export const CloseIcon = styled(RawCloseIcon)`
  width: 1rem;
  height: 1rem;
`;

export const Hint = styled.p`
  margin: 1.2rem 0 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: center;
  ${getTypography("caption2Medi")}
`;

export const BottomBar = styled.div`
  padding: 1rem 2.4rem 2.4rem;

  /* 공용 Button 가득 차게 */
  & > button {
    width: 100%;
  }
`;