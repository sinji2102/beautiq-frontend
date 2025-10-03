import { css } from "@emotion/react";
import type { ThemeType } from "@styles/theme";

export const globalStyles = (theme: ThemeType) => css`
  /* Pretendard 공식 CDN 불러오기 */
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

  html {
    font-size: 62.5%;
    font-family: Pretendard, "Noto Sans KR", sans-serif;
  }

  /* 모바일뷰 세팅 */
  body {
    position: relative;
    display: flex;
    width: 375px;
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;

    /* TODO : 배경색 임시 설정 */
    background-color: ${theme.colors.neutral[900]};
  }

  /* body태그 안에 id가 root인 div태그 기본 세팅 */
  #root {
    width: 100%;
  }
`;
