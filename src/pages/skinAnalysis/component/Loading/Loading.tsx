import AILoading from "@assets/lottie/ai-loading.json";
import Lottie from "lottie-react";
import React from "react";

import * as S from "./Loading.styled";

type Props = {
  userName?: string;
};

const Loading: React.FC<Props> = ({ userName = "사용자" }) => {
  return (
    <S.Screen>
      <S.Body>
        <Lottie animationData={AILoading} loop={true} style={{ width: 150, height: 150 }} />
        <S.MainText>피부 분석중</S.MainText>
        <S.SubText>
          {userName}님의 피부를 분석중입니다
          <br />
          잠시만 기다려 주세요
        </S.SubText>
      </S.Body>
    </S.Screen>
  );
};

export default Loading;
