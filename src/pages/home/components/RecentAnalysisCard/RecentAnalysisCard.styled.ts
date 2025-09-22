import { IconBubbles } from "@assets/svgs";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.2rem 2.4rem;
  padding: 2.6rem 2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.primary[200]};
  border-radius: 2rem;
`;

export const CardTitle = styled.h1`
  all: unset;
  display: flex;
  gap: 0.4rem;
  align-items: center;

  ${getTypography("body1NormalSemi")}
`;

export const BubblesIcon = styled(IconBubbles)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const ResultBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.black};

  ${getTypography("caption1Semi")}
`;

export const DateText = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};

  ${getTypography("caption2Medi")}
`;

// TODO : 피그마에서 디자인 변경하고 반영하기
export const BadgeContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const getBackgroundColorByScore = (theme: Theme, score?: number) => {
  if (score == null) {
    return theme.colors.primary[500];
  }

  if (score <= 30) return theme.colors.primary[900];
  if (score <= 60) return theme.colors.primary[600];
  return theme.colors.primary[200];
};

export const Badge = styled.div<{ score?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 1.6rem;

  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 1.3rem;

  background-color: ${({ theme, score }) => getBackgroundColorByScore(theme, score)};
  border-radius: 4rem;

  ${getTypography("caption2Medi")}
`;

export const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: end;
`;

export const ScoreText = styled.span`
  color: ${({ theme }) => theme.colors.gray[700]};
  ${getTypography("caption2Medi")}
`;

export const FullHistoryButton = styled.button`
  width: 100%;
  padding: 1rem;

  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 0.8rem;

  ${getTypography("body2NormalSemi")}
`;
