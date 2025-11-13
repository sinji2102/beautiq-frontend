import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.neutral[0]};
`;

export const Body = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 1.6rem;

  text-align: center;
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

  opacity: 0.8;
`;
