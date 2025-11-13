import { getTodayTip } from "@apis/domain/today-tip/api.ts"; // 경로는 실제 프로젝트 구조에 맞게 수정
import { useEffect, useState } from "react";

import * as S from "./TodayTip.styled";

const TodayTip = () => {
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    const fetchTodayTip = async () => {
      const data = await getTodayTip();
      if (data) {
        setTip(data.tip ?? "");
      } else {
        setTip("오늘의 팁을 불러오지 못했습니다 🥲");
      }
    };

    fetchTodayTip();
  }, []);

  return (
    <S.TipContainer>
      <S.Title>
        <S.GrowingHeartIcon />
        오늘의 뷰티 팁
      </S.Title>
      {tip}
    </S.TipContainer>
  );
};

export default TodayTip;
