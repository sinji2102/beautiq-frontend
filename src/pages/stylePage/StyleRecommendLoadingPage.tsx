import AILoading from "@assets/lottie/ai-loading.json";
import Header from "@components/commons/header/Header";
import Lottie from "lottie-react";
import React from "react";

import * as S from "./StyleRecommendLoadingPage.styled";

type Props = {
  userName?: string;
};

const StyleRecommendLoadingPage: React.FC<Props> = ({ userName = "사용자" }) => {
  return (
    <S.Screen>
      <Header left="back" text="스타일 추천"  />

      <S.Body>
        <Lottie animationData={AILoading} loop={true} style={{ width: 150, height: 150 }} />
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