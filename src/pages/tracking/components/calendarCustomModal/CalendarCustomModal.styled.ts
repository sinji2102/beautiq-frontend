import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CalendarCustomModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CalendarCustomTitle = styled.div`
  ${getTypography("heading4")};
  display: flex;
`;

export const CalendarCustomSubTitler = styled.div`
  ${getTypography("caption1Medi")};
  color: ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  margin-bottom:1rem;
`;

export const CalendarButtonWrapper = styled.div`
  display:flex; 
  flex-direction:column;
  gap:1.2rem;
`;
