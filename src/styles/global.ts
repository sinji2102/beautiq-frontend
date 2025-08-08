import { css } from "@emotion/react";

export const globalStyles = css`
  html {
    font-size: 62.5%;
    /* TODO : pretendard로 변경 */
    font-family: "Noto Sans KR", sans-serif;
  }

  /* 모바일뷰 세팅 */
  body {
    width: 375px;
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;

    /* TODO : 배경색 임시 설정 */
    background-color: wheat;
  }
`;
