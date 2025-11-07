import { IconFaceGraph } from "@assets/svgs";
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

export const LineChartTitleWrapper = styled.div`
  display: flex;
  padding: 0.2rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
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

export const AvgRightContent = styled.div<{score: number}>`
  display: flex;
  padding: 0.2rem 1.6rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 4rem;

  background: ${({theme, score})=>
    score >= 80? theme.colors.neutral[300]
    : score >= 60
      ? theme.colors.neutral[500]
      :theme.colors.neutral[800] 
  };
  color: ${({ theme }) => theme.colors.white};
`;

export const FaceGraphIcon = styled(IconFaceGraph)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const FeedBackWrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.4rem;
  align-self: stretch;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

export const FeedBackTitle = styled.div`
  ${getTypography("caption2Semi")};
'`;

export const FeedBackText = styled.div`
  ${getTypography("caption2Medi")};
`;

export const LineChartInformation = styled.div`
  ${getTypography("caption1Medi")};
  color: ${({ theme }) => theme.colors.gray[500]};
  padding: 2rem 0;
  line-height: 18px;
  letter-spacing: -0.3px;
  white-space: pre-line;
  text-align: center;

  width: 100%;
`;
