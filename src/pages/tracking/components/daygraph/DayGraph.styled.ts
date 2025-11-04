import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const LineChartWrapper = styled.div`
  display: flex;
  padding: 1.6rem 2rem;
  margin: 1.2rem 1.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

export const LineChartTitle = styled.div`
  ${getTypography("body2NormalSemi")};

  color: ${({ theme }) => theme.colors.black};
`;

export const LineCharAvgtWrapper = styled.div`
  display: flex;
  padding: 0.2rem 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const AvgLeft = styled.div`
  ${getTypography("caption1Medi")};
`;

export const AvgRightWrapper = styled.div`
  display: flex;
  padding: 0.4rem;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

export const AvgRightText = styled.div`
  ${getTypography("caption2Medi")};
`;

export const AvgRightContent = styled.div`
  display: flex;
  padding: 0.2rem 1.6rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 4rem;
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.white};
`;
