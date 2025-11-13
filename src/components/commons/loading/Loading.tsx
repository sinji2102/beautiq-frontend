import AILoading from "@assets/lottie/ai-loading.json";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

import * as S from "./Loading.styled";

const Loading: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Screen>
      <S.Body>
        <Lottie animationData={AILoading} loop style={{ width: 150, height: 150 }} />
        <S.MainText>로딩중{dots}</S.MainText>
        <S.SubText>
          데이터를 처리하고 있습니다.
          <br />
          잠시만 기다려 주세요.
        </S.SubText>
      </S.Body>
    </S.Screen>
  );
};

export default Loading;
