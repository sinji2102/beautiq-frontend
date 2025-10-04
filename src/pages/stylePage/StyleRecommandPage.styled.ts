import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

/* 전체 배경 → 흰색 */
export const Screen = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

/* 헤더: 타이틀 중앙, X 버튼 테두리 제거 */
export const HeaderBar = styled.header`
  height: 5.6rem;                 /* 56px */
  padding: 0 1.6rem;              /* 0 16px */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ theme }) => theme.colors.neutral[100]};

  .title {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary[500]};
    letter-spacing: -0.02rem;     /* -0.2px */
    ${getTypography("heading3")}
  }

  .close {
    position: absolute;
    right: 1.2rem;                /* 12px */
    top: 50%;
    transform: translateY(-50%);
    width: 3.6rem;                /* 36px */
    height: 3.6rem;               /* 36px */
    display: grid;
    place-items: center;
    background: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.primary[500]};
    font-size: 3.2rem;            /* 32px */
    cursor: pointer;
  }
`;

/* 본문: 업로드 영역을 살짝 더 위로 */
export const Body = styled.main`
  padding: 1.2rem 1.6rem 2.4rem;  /* 12px 16px 24px */
  max-width: 36rem;               /* 360px */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;                      /* 10px */
`;

/* 섹션 경계 제거 */
export const Card = styled.section`
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
`;

export const CustomInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[100]};
  }
`;

/* 밑줄형 인풋: 피그마 '끝이 둥근 캡'을 배경 레이어로 정확 재현 */
export const InputBlock = styled.div`
  margin: 1.2rem 0 2.4rem;        /* 12px 0 24px */
  position: relative;
  padding-bottom: 1.6rem;         /* 16px - 캡 바 여유 */

  .label {
    position: absolute;
    width: 0.1rem;                /* 1px */
    height: 0.1rem;               /* 1px */
    padding: 0;
    margin: -0.1rem;              /* -1px */
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* 메인 라인 + 좌/우 캡(반원)을 조합해 '라운드 바' 생성 */
  &::after,
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 0.2rem;               /* 2px */
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 4rem;                 /* 40px */
    border: 0;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary[500]};
    background: transparent;
    padding: 0 0.4rem;            /* 0 4px */
    font-size: 1.4rem;            /* 14px */
    border-radius: 0.6rem;        /* 6px */
    outline: none;
    ${getTypography("body2NormalSemi")}

    &::placeholder {
      color: #bda8b3;
      text-align: center;
    }

    &:focus {
      box-shadow: none !important;
      outline: none;
    }
  }
`;

/* '다음으로' 버튼: 원래 느낌 유지(테두리/그림자 X) */
export const BottomBar = styled.div`
  padding-bottom: 1.6rem;         /* 16px */

  button {
    width: 100%;
    height: 4.8rem;               /* 48px */
    border-radius: 1.2rem;        /* 12px */
    background: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.primary[0]};
    font-weight: 800;
    font-size: 1.6rem;            /* 16px */
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