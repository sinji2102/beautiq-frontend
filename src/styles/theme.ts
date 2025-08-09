export const theme = {
  // 색상
  colors: {
    primary: {
      0: "#FFF5F9",
      50: "#FFE8F0",
      100: "#FFD1E1",
      200: "#F9AAC4",
      300: "#F384AD",
      400: "#ED669A",
      500: "#E46198",
      600: "#CC4B86",
      700: "#A53B6D",
      800: "#7F2E55",
      900: "#5A213E",
    },
    neutral: {
      0: "#FFFFFF",
      50: "#FFF8FA",
      100: "#FDEFF5",
      200: "#F9CCE2",
      300: "#F3A7CA",
      400: "#ED86B4",
      500: "#E4679D",
      600: "#C04E84",
      700: "#973B68",
      800: "#6F2B4D",
      900: "#4A1C35",
    },
    gray: {
      0: "#F4F4F4",
      100: "#EEEEEE",
      200: "#CCCCCC",
      300: "#B2B2B2",
      400: "#939393",
      500: "#797979",
      600: "#626262",
      700: "#3E3E3E",
      800: "#2A2A2A",
      900: "#1B1B1B",
    },
    white: "#FFFFFF",
    black: "#0F0F0F",
  },

  // 폰트
  typography: {
    heading1: {
      size: "2.4rem",
      weight: 700, // Bold
      lineHeight: "3.2rem",
      letterSpacing: "-2.5%",
    },
    heading2: {
      size: "2.2rem",
      weight: 700,
      lineHeight: "3.0rem",
      letterSpacing: "-2.5%",
    },
    heading3: {
      size: "2.0rem",
      weight: 600, // Semibold
      lineHeight: "2.8rem",
      letterSpacing: "-2%",
    },
    heading4: {
      size: "1.8rem",
      weight: 600,
      lineHeight: "2.6rem",
      letterSpacing: "-1%",
    },
    body1NormalSemi: {
      size: "1.6rem",
      weight: 600,
      lineHeight: "2.4rem",
      letterSpacing: "-1%",
    },
    body1NormalMedi: {
      size: "1.6rem",
      weight: 500,
      lineHeight: "2.4rem",
      letterSpacing: "-1%",
    },
    body1Long: {
      size: "1.6rem",
      weight: 400,
      lineHeight: "2.6rem",
      letterSpacing: "-1%",
    },
    body2NormalSemi: {
      size: "1.4rem",
      weight: 600,
      lineHeight: "2.0rem",
      letterSpacing: "-0.5%",
    },
    body2NormalMedi: {
      size: "1.4rem",
      weight: 500,
      lineHeight: "2.0rem",
      letterSpacing: "-0.5%",
    },
    body2Long: {
      size: "1.4rem",
      weight: 400,
      lineHeight: "2.2rem",
      letterSpacing: "-0.5%",
    },
    caption1Semi: {
      size: "1.2rem",
      weight: 600,
      lineHeight: "1.8rem",
      letterSpacing: "0%",
    },
    caption1Medi: {
      size: "1.2rem",
      weight: 500,
      lineHeight: "1.8rem",
      letterSpacing: "0%",
    },
    caption2Semi: {
      size: "1.1rem",
      weight: 500,
      lineHeight: "1.6rem",
      letterSpacing: "0%",
    },
    caption2Medi: {
      size: "1.1rem",
      weight: 500,
      lineHeight: "1.6rem",
      letterSpacing: "0%",
    },
  },
  fonts: {
    main: "Pretendard, sans-serif",
  },
} as const;

export type ThemeType = typeof theme;
