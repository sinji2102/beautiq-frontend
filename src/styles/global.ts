import { css } from "@emotion/react";
import type { ThemeType } from "@styles/theme";

export const globalStyles = (theme: ThemeType) => css`
  html {
    font-size: 62.5%;
    /* TODO : pretendard로 변경 */
    font-family: "Noto Sans KR", sans-serif;
  }

  /* 모바일뷰 세팅 */
  body {
    display: flex;
    width: 375px;
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    position: relative;

    /* TODO : 배경색 임시 설정 */
    background-color: ${theme.colors.neutral[900]};
  }

  /* body태그 안에 id가 root인 div태그 기본 세팅 */
  #root {
    width: 100%;
  }

  /* 폰트 세팅 */
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff")
      format("woff");
    font-weight: 100;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraLight.woff")
      format("woff");
    font-weight: 200;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff")
      format("woff");
    font-weight: 300;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
      format("woff");
    font-weight: 500;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff")
      format("woff");
    font-weight: 600;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
      format("woff");
    font-weight: 700;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-ExtraBold.woff")
      format("woff");
    font-weight: 800;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Black.woff")
      format("woff");
    font-weight: 900;
  }
`;
