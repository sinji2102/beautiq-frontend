import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

import type { ButtonSizeTypes, ButtonVariantTypes } from "./Button";

interface DefaultBtnPropTypes {
  $size: ButtonSizeTypes;
  $variant: ButtonVariantTypes;
  $isDisabled?: boolean;
}

const width = {
  xlarge: "32.7rem",
  large: "27.9rem",
  medium: "15.8rem",
  small: "13.6rem",
  xsmall: "10.3rem",
};

const height = {
  xlarge: "5.6rem",
  large: "4.4rem",
  medium: "5.6rem",
  small: "4.4rem",
  xsmall: "3.6rem",
};

export const ButtonWrapper = styled.button<DefaultBtnPropTypes>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $size }) =>
    `
    width: ${width[$size]};
    height: ${height[$size]};
  `}

  ${getTypography("body2NormalSemi")}
  ${({ $size }) => $size === "xlarge" && getTypography("body1NormalSemi")};
  ${({ $size }) => $size === "xsmall" && getTypography("caption1Semi")};

  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "cursor")};
  border-radius: 6px;

  ${({ $variant, $isDisabled, theme }) => {
    switch ($variant) {
      case "primary":
        return $isDisabled
          ? `
              color: ${theme.colors.white};
              background-color: ${theme.colors.gray[200]};
              
            `
          : `
              color: ${theme.colors.white};
              background-color: ${theme.colors.primary[500]};
            `;
      case "line":
        return $isDisabled
          ? `
              color: ${theme.colors.neutral[800]};
              background-color: ${theme.colors.gray[200]};
              border: 1px solid ${theme.colors.neutral[600]};
            `
          : `
              color: ${theme.colors.primary[500]};
              background-color: ${theme.colors.white};
              border: 1px solid ${theme.colors.primary[500]};
            `;
      case "modal":
        return `
               color: ${theme.colors.white};
              background-color: ${theme.colors.primary[200]};`;
    }
  }}
`;
