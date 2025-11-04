import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const RecommendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Title = styled.h1`
  ${getTypography("heading3")}
  margin: 1.6rem 2rem;

  white-space: pre-line;
  text-align: start;
`;

export const SubTitle = styled.h2`
  ${getTypography("body2NormalSemi")}
  margin: 0.4rem 2rem;
`;
