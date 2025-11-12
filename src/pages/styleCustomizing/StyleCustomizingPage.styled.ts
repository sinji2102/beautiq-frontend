import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import {
  IconBack as RawBackIcon,
  IconBefore as RawBeforeIcon,
  IconClose as RawCloseIcon,
} from "../../assets/svgs";

/** 전체 화면 */
export const Screen = styled.div`
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};
`;

/** (공통 헤더에서 쓰는 아이콘 크기만 맞춰둠) */
export const BackIcon = styled(RawBackIcon)`
  width: 2.4rem;
  height: 2.4rem;
`;
export const CloseIcon = styled(RawCloseIcon)`
  width: 2.2rem;
  height: 2.2rem;
`;

/** 본문 */
export const Body = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30rem;
  height: 100dvh;
  max-height: 70.2rem;
  margin: auto;
  padding: 1.6rem 1.6rem 2.4rem;
`;

/** 이미지 미리보기 */
export const PreviewWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
`;

export const ImageBox = styled.div`
  position: relative;
  display: grid;
  width: 30rem;
  height: 40rem;
  overflow: hidden;

  background: linear-gradient(45deg, #eee 25%, transparent 25% 50%, #eee 50% 75%, transparent 75%) 0
    0/20px 20px;
  border-radius: 0.8rem;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    user-select: none;
    -webkit-user-drag: none;
  }
`;

export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
  ${getTypography("body2NormalSemi")}
`;

export const OriginalPeekBtn = styled.button`
  position: absolute;
  right: 0.8rem;
  bottom: 0.8rem;
  display: grid;
  width: 3.6rem;
  height: 3.6rem;

  background: transparent;
  cursor: pointer;
  border: none;
  border-radius: 50%;

  transition: transform 0.1s ease;
  place-items: center;

  &:active {
    transform: scale(0.96);
  }
`;

export const PeekIcon = styled(RawBeforeIcon)`
  display: block;
  width: 2rem;
  height: 2rem;
`;

/** 카테고리 (피부/입술/눈/뺨) */
export const CategoryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  justify-items: center;
  width: 100%;
  margin-top: 1.6rem;
`;

export const CategoryBtn = styled.button<{ active?: boolean }>`
  display: grid;
  width: 5.6rem;
  height: 5.6rem;

  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.primary[400])};

  background: ${({ theme, active }) =>
    active ? theme.colors.primary[400] : theme.colors.primary[50]};
  box-shadow: ${({ active }) => (active ? "0 4px 10px rgba(237, 71, 133, 0.25)" : "none")};
  border: none;
  border-radius: 50%;

  transition:
    transform 0.1s ease,
    background 0.2s ease;
  place-items: center;

  &:active {
    transform: scale(0.97);
  }
`;

export const CategoryLabel = styled.div`
  margin-top: 0.6rem;

  ${getTypography("body2NormalSemi")}
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

/** 슬라이더 영역(카테고리 선택 시 표시) */
export const ControlWrap = styled.div`
  width: 100%;
  padding: 1.2rem 0 0.4rem;
`;

/** 하단 버튼(공통 Button 컴포넌트와 배치만 제공) */
export const Footer = styled.div`
  width: 100%;
  margin: auto; /* 👉 버튼을 아래로 밀착 */
  place-items: center;
`;

export const SaveBar = styled.div`
  margin-top: 1.2rem;
`;
