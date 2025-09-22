import { IconLipstick, IconLotionBottle } from "@assets/svgs";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CardContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-between;
  height: 14.8rem;
  padding: 1rem 2.4rem;
`;

export const CardSubText = styled.span`
  ${getTypography("caption1Medi")}
  white-space: pre-line;
`;

export const Card = styled.button<{ variant?: "skin" | "makeup" }>`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem;

  color: ${({ theme, variant }) =>
    variant === "makeup" ? theme.colors.white : theme.colors.black};

  background-color: ${({ theme, variant }) =>
    variant === "makeup" ? theme.colors.primary[200] : theme.colors.neutral[100]};

  ${CardSubText} {
    color: ${({ theme, variant }) =>
      variant === "makeup" ? theme.colors.gray[100] : theme.colors.gray[600]};
  }
  box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 25%);
  border-radius: 2rem;
  ${getTypography("body1NormalSemi")}
`;

export const LipstickIcon = styled(IconLipstick)`
  width: 4.4rem;
  height: 4.4rem;
`;

export const LotionBottleIcon = styled(IconLotionBottle)`
  width: 4.4rem;
  height: 4.4rem;
`;
