import { css } from "@emotion/react";

import type { ThemeType } from "./theme";

type TypographyVariant = keyof ThemeType["typography"];

export const createTypography = (theme: ThemeType) => {
  const variants = Object.keys(theme.typography) as TypographyVariant[];

  return variants.reduce(
    (acc, variant) => {
      acc[variant] = css`
        font-family: ${theme.fonts.main};
        font-size: ${theme.typography[variant].size};
        font-weight: ${theme.typography[variant].weight};
        line-height: ${theme.typography[variant].lineHeight};
        letter-spacing: ${theme.typography[variant].letterSpacing};
      `;
      return acc;
    },
    {} as Record<TypographyVariant, ReturnType<typeof css>>
  );
};

export const getTypography =
  (variant: TypographyVariant) =>
  ({ theme }: { theme: ThemeType }) => {
    const typo = createTypography(theme);
    return typo[variant];
  };

export type { TypographyVariant };
