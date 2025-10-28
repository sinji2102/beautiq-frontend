import Header from "@components/commons/header/Header";
import React from "react";

import * as S from "./StyleRecommendLoadingPage.styled";

type Props = {
  userName?: string;
};

const StyleRecommendLoadingPage: React.FC<Props> = ({ userName = "ooo" }) => {
  return (
    <S.Screen>
      <Header left="back" text="스타일 추천"  />

      <S.Body>
        <S.PreviewBox aria-label="생성 미리보기" />
        <S.MainText>스타일 생성 중</S.MainText>
        <S.SubText>
          {userName}님에게 맞는 스타일을 생성 중이에요
          <br />
          조금만 기다려 주세요~
        </S.SubText>
      </S.Body>
    </S.Screen>
  );
};

export default StyleRecommendLoadingPage;