import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import { IconClose as RawCloseIcon } from "../../assets/svgs";

export const Screen = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary[0]};
  display: flex;
  flex-direction: column;
`;

export const CloseIcon = styled(RawCloseIcon)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2.4rem 1.6rem;
  gap: 1.6rem;
  background: ${({ theme }) => theme.colors.neutral[0]};
`;

export const MainText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  ${getTypography("heading1")}
`;

export const SubText = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  ${getTypography("body2NormalSemi")}
`;
