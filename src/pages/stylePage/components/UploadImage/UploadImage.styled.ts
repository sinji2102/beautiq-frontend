// src/pages/stylePage/components/UploadImage/UploadImage.styled.ts
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

// ✅ SVGR로 생성된 아이콘 컴포넌트들 (경로는 프로젝트 구조에 맞게 조정하세요)
import { IconCam as RawCamIcon, IconClose as RawCloseIcon } from "../../../../assets/svgs";

export const Wrap = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Placeholder = styled.div`
  width: 16rem;            
  height: 16rem;           
  border-radius: 1.6rem;  
  background: ${({ theme }) => theme.colors.primary[100]};
  display: grid;
  place-items: center;
`;

export const CamIcon = styled(RawCamIcon)`
  width: 6.2rem;
  height: 5.6rem;

  /* 필요 시 색상 제어 (SVG 구조에 따라 fill/stroke 중 맞는 것 선택) */
  /* path, circle, rect, line, polyline {
    stroke: ${({ theme }) => theme.colors.primary[500]};
    fill: ${({ theme }) => theme.colors.primary[500]};
  } */
`;

export const Preview = styled.div`
  width: 16rem;            /* 160px */
  height: 16rem;           /* 160px */
  border-radius: 1.6rem;   /* 16px */
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove {
    position: absolute;
    top: 0.8rem;           /* 8px */
    right: 0.8rem;         /* 8px */
    width: 2.6rem;         /* 26px */
    height: 2.6rem;        /* 26px */
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
  width: 0.2rem;
  height: 0.2rem;

  /* 필요 시 색상 제어 */
  /* path, line, rect, circle {
    stroke: ${({ theme }) => theme.colors.primary[700]};
    fill: ${({ theme }) => theme.colors.primary[700]};
  } */
`;

export const Hint = styled.p`
  margin: 1.2rem 0 1.6rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral[700]};
  text-align: center;
  ${getTypography("caption2Medi")}
`;

export const BtnRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;                           /* ✅ grid로 동일 너비 두 버튼 */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 0 1rem;
  justify-items: center;

  @media (max-width: 36rem) {              /* 360px */
    grid-template-columns: 1fr;
  }
`;