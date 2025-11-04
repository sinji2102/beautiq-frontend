import { IconArrow } from "@assets/svgs";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const MenuItemWrapper = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${getTypography("body2Long")};
`;

export const ArrowIcon = styled(IconArrow)`
  width: 2.4rem;
  height: 2.4rem;

  fill: ${({ theme }) => theme.colors.primary[100]};
`;

export const ArrowBtn = styled.div`
  all: unset;
  padding: 0.4rem;
`;
