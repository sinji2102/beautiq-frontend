import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CardContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1.2rem 2.4rem;
  padding: 2.6rem 2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.primary[200]};
  border-radius: 2rem;
`;

export const CardTitle = styled.h1`
  all: unset;
  ${getTypography("body1NormalSemi")}
`;
