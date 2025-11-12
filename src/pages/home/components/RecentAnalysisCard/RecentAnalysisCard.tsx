import { useNavigate } from "react-router-dom";

import * as S from "./RecentAnalysisCard.styled";

const tempAPI = {
  skin: {
    date: "2025.08.12",
    score: 80,
  },
  makeup: {
    date: "2025.08.12",
    style: ["내추럴", "테스트"],
  },
};

const RecentAnalysisCard = () => {
  const navigate = useNavigate();

  return (
    <S.CardContainer>
      <S.CardTitle>
        <S.BubblesIcon />
        최근 분석 결과
      </S.CardTitle>
      <S.ResultBox>
        <S.ItemInfo>
          <S.Title>피부 분석</S.Title>
          {/* TODO : API 맞춰서 날짜 형식 맞추기 */}
          <S.DateText>{tempAPI.skin.date}</S.DateText>
        </S.ItemInfo>
        <S.ScoreBox>
          <S.Badge score={tempAPI.skin.score}>어쩌구</S.Badge>
          <S.ScoreText>{tempAPI.skin.score}점</S.ScoreText>
        </S.ScoreBox>
      </S.ResultBox>
      <S.ResultBox>
        <S.ItemInfo>
          <S.Title>메이크업 추천</S.Title>
          {/* TODO : API 맞춰서 날짜 형식 맞추기 */}
          <S.DateText>{tempAPI.makeup.date}</S.DateText>
        </S.ItemInfo>
        <S.BadgeContainer>
          {tempAPI.makeup.style.map((item) => {
            return <S.Badge>{item}</S.Badge>;
          })}
        </S.BadgeContainer>
      </S.ResultBox>
      {/* TODO : 이동 url 확인해서 수정 */}
      <S.FullHistoryButton onClick={() => navigate("/tracking")}>
        전체 히스토리 보기
      </S.FullHistoryButton>
    </S.CardContainer>
  );
};

export default RecentAnalysisCard;
