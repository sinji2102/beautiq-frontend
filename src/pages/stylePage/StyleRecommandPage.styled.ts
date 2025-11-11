import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import { IconClose as RawCloseIcon } from "../../assets/svgs";

export const Screen = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

export const HeaderBar = styled.header`
  height: 5.6rem;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ theme }) => theme.colors.neutral[100]};

  .title {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary[500]};
    letter-spacing: -0.02rem;
    ${getTypography("heading3")}
  }

  .close {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3.6rem;
    height: 3.6rem;
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    &:focus-visible {
      outline: 0.2rem solid ${({ theme }) => theme.colors.primary[400]};
      outline-offset: 0.2rem;
    }
  }
`;

export const CloseIcon = styled(RawCloseIcon)`
  width: 2.4rem; /* 24px */
  height: 2.4rem; /* 24px */

  /* 필요 시 색상 제어
  path, line, circle, rect {
    stroke: ${({ theme }) => theme.colors.primary[500]};
    fill: ${({ theme }) => theme.colors.primary[500]};
  } */
`;

export const Body = styled.main`
  padding: 1.2rem 1.6rem 2.4rem;
  max-width: 36rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.section`
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
`;

export const CustomInput = styled.input`
  display: flex;
  width: 100%;
  height: 4rem;                 /* 40px */
  border: 0;                    /* 전체 테두리 제거 */git 
  font-size: 1.4rem;            /* 14px */
  font-color: ${({ theme }) => theme.colors.gray[300]};
  ${getTypography("body2NormalSemi")}

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary[500]};
  border-radius: 0.6rem;      


  &::placeholder {
    color: #bda8b3;
    text-align: center;         /* 플레이스홀더 중앙 정렬 */
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// ✅ 밑줄(캡) 레이어
export const InputBlock = styled.div`
  // /* 조절값 */
  // --side-gap: 0.8rem;   /* 좌우 여백 */
  // --bar-h: 0.1rem;      /* 선 두께 = 1px */
  // --cap-d: 0.rem;      /* 캡 지름(원) = 1px  ← 반드시 1px이면 bar와 동일하게! */

  // position: relative;
  // margin: 1rem 0 2.4rem;
  // padding-bottom: 1.6rem;

  // /* 1px 라인 */
  // &::after {
  //   content: "";
  //   position: absolute;
  //   left: calc(var(--side-gap) + var(--cap-d) / 2);
  //   right: calc(var(--side-gap) + var(--cap-d) / 2);
  //   bottom: 0;
  //   height: var(--bar-h);
  //   background: ${({ theme }) => theme.colors.primary[500]};
  // }

  // /* 양쪽 원형 캡 2개 */
  // &::before {
  //   content: "";
  //   position: absolute;
  //   left: var(--side-gap);
  //   right: var(--side-gap);
  //   bottom: 0;
  //   height: var(--cap-d);
  //   background:
  //     radial-gradient(circle, ${({ theme }) => theme.colors.primary[500]} 60%, transparent 61%)
  //       left bottom / var(--cap-d) var(--cap-d) no-repeat,
  //     radial-gradient(circle, ${({ theme }) => theme.colors.primary[500]} 60%, transparent 61%)
  //       right bottom / var(--cap-d) var(--cap-d) no-repeat;
  //   pointer-events: none;
  // }
`;

export const BottomBar = styled.div`
  padding: 0.1 2.4rem;

  button {
    width: 100%;
    height: 5.6rem;
    border-radius: 0.6rem;
    background: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.primary[0]};
    font-weight: 800;
    font-size: 1.6rem;
    border: none;
    box-shadow: none;
    outline: none;
    ${getTypography("body1NormalSemi")}

    &:focus,
    &:active {
      border: none;
      box-shadow: none;
      outline: none;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;
