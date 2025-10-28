import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import { IconClose as RawCloseIcon } from "../../assets/svgs";

export const Screen = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary[0]};
  display: flex;
  flex-direction: column;
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
  width: 2.4rem;
  height: 2.4rem;
`;

export const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* ✅ 세로 중앙 */
  align-items: center;     /* ✅ 가로 중앙 */
  text-align: center;
  padding: 2.4rem 1.6rem;
  gap: 1.6rem;
  background: ${({ theme }) => theme.colors.neutral[0]};
`;

export const PreviewBox = styled.div`
  width: 28rem;  /* ✅ 280px */
  height: 28rem; /* ✅ 280px */
  background: ${({ theme }) => theme.colors.primary[300]};
  border-radius: 0.8rem;
`;

export const MainText = styled.h2`
  margin: 0.4rem 0 0;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 800;
  ${getTypography("heading1")}
`;

export const SubText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${getTypography("body2NormalSemi")}
  line-height: 1.5;
`;