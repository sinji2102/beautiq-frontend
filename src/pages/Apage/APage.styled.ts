import styled from "@emotion/styled";

import { getTypography } from "../../styles/typography";

export const TempHeader = styled.h1`
  background-color: ${({ theme }) => theme.colors.primary[100]};
  width: "20rem";
  height: "20rem";
  ${getTypography("heading1")}
`;

export const TempBody = styled.h1`
  background-color: ${({ theme }) => theme.colors.primary[300]};
  width: "20rem";
  height: "20rem";
  ${getTypography("body1NormalMedi")}
`;

export const TempCaption = styled.h1`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  width: "20rem";
  height: "20rem";
  ${getTypography("caption1Medi")}
`;
