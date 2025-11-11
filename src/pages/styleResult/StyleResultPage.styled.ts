import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import {
  IconBack as RawBackIcon,
  IconBefore as RawBeforeIcon,
  IconClose as RawCloseIcon,
} from "../../assets/svgs";

export const Screen = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const BackIcon = styled(RawBackIcon)`
  width: 2.4rem;
  height: 2.4rem;
`;
export const CloseIcon = styled(RawCloseIcon)`
  width: 2.2rem;
  height: 2.2rem;
`;

/** 본문을 헤더 제외 전체 높이로 잡아서 하단 버튼이 아래에 붙도록 */
export const Body = styled.main`
  max-width: 30rem;
  margin: auto;
  padding: 1.6rem 1.6rem 2.4rem;
  height: 100dvh;
  max-height: 70.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PreviewWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 30rem;
  height: 40rem;
  border-radius: 0.8rem;
  overflow: hidden;
  display: grid;
  place-items: center;
  background:
    linear-gradient(45deg, #eee 25%, transparent 25% 50%, #eee 50% 75%, transparent 75%) 0 0/20px 20px;

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
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: none;
  background: transparent; /* 아이콘만 보이도록 */
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.96);
  }
`;

export const PeekIcon = styled(RawBeforeIcon)`
  width: 2rem;
  height: 2rem;
  display: block;
`;

export const Caption = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  margin: 0.1rem 0 0; /* 👈 아래 여백 완전히 제거 */
  ${getTypography("body2NormalSemi")};

  strong {
    color: ${({ theme }) => theme.colors.black};
  }
`;

/** 하단 고정 영역 */
export const Footer = styled.div`
  margin-top: auto; 👈 버튼을 글씨에 거의 붙게 */
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
`;

export const SecondaryBtn = styled.button<{ disabled?: boolean }>`
  height: 5.2rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.primary[0]};
  color: ${({ theme }) => theme.colors.gray[200]};
  ${getTypography("body2NormalSemi")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PrimaryBtn = styled.button`
  height: 5.2rem;
  border-radius: 0.8rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.primary[0]};
  ${getTypography("body2NormalSemi")}
`;

export const SaveBar = styled.div`
  margin-top: 1rem;
`;

export const SaveBtn = styled.button`
  width: 100%;
  height: 5.6rem;
  border-radius: 0.8rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.primary[0]};
  ${getTypography("body1NormalSemi")}
`;

