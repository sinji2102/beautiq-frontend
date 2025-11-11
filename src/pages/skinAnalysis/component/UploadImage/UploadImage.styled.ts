// src/pages/stylePage/components/UploadImage/UploadImage.styled.ts
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

// ✅ SVGR로 생성된 아이콘 컴포넌트들 (경로는 프로젝트 구조에 맞게 조정하세요)
import { IconClose as RawCloseIcon } from "../../../../assets/svgs";

export const Wrap = styled.div`
  display: flex;
  height: 100dvh;
  max-height: 74.2rem;
  padding: 3.2rem 2.4rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Placeholder = styled.div`
  display: flex;
  height: 40rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  align-self: stretch;

  border-radius: 2rem;
  border: solid 0.2rem ${({ theme }) => theme.colors.primary[400]};
  background: ${({ theme }) => theme.colors.neutral[100]};
`;

export const PlaceholderMainText = styled.div`
  ${getTypography("heading1")};
`;

export const PlaceholderSubText = styled.div`
  color: ${({ theme }) => theme.colors.gray[700]};
  white-space: pre-wrap;
  ${getTypography("body2NormalSemi")};
`;

export const Preview = styled.div`
  width: 100%;
  height: 40rem;
  border-radius: 1.6rem; /* 16px */
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  border: solid 0.2rem ${({ theme }) => theme.colors.primary[400]};
  background: ${({ theme }) => theme.colors.neutral[100]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove {
    position: absolute;
    top: 0.8rem; /* 8px */
    right: 0.8rem; /* 8px */
    width: 2.6rem; /* 26px */
    height: 2.6rem; /* 26px */
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

export const CloseIcon = styled(RawCloseIcon)`
  width: 1.6rem;
  height: 1.6rem;

  /* 필요 시 색상 제어 */
  /* path, line, rect, circle {
    stroke: ${({ theme }) => theme.colors.black};
    fill: ${({ theme }) => theme.colors.black};
  } */
`;
