import { IconGrowingHeart } from "@assets/svgs";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const TipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 1.2rem 2.4rem 3.6rem;
  padding: 1.2rem 2rem;

  color: ${({ theme }) => theme.colors.gray[800]};
  text-align: start;

  background: ${({ theme }) => theme.colors.neutral[100]};
  box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 25%);
  border-radius: 2rem;

  ${getTypography("caption2Medi")}
`;

export const Title = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.2rem 0;

  color: ${({ theme }) => theme.colors.neutral[600]};

  ${getTypography("body1NormalSemi")}
`;

export const GrowingHeartIcon = styled(IconGrowingHeart)`
  width: 2.4rem;
  height: 2.4rem;
`;
