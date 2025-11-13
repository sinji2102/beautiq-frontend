import { getSkinAnalysisLatest, type SkinAnalysisResponse } from "@apis/domain/skin-analysis/api";
import { useEffect, useState } from "react";
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
  const [skinData, setSkinData] = useState<SkinAnalysisResponse>();

  useEffect(() => {
    const fetchAnalysis = async () => {
      const data = await getSkinAnalysisLatest();
      if (data) {
        setSkinData(data);
      } else {
        console.error("최근 피부 분석 결과를 불러오지 못했습니다.");
      }
    };

    fetchAnalysis();
  }, []);

  const getBadgeLabel = (score?: number) => {
    if (score === undefined || score === null) return "양호";
    if (score >= 81) return "양호";
    if (score >= 61) return "주의";
    return "위험";
  };

  return (
    // TODO : 둘 다 없을 때 ui 필요
    <S.CardContainer>
      <S.CardTitle>
        <S.BubblesIcon />
        최근 분석 결과
      </S.CardTitle>
      {skinData ? (
        <S.ResultBox>
          <S.ItemInfo>
            <S.Title>피부 분석</S.Title>
            <S.DateText>{skinData?.createdAt}</S.DateText>
          </S.ItemInfo>
          <S.ScoreBox>
            <S.Badge score={skinData?.averageScore}>
              {getBadgeLabel(skinData?.averageScore)}
            </S.Badge>
            <S.ScoreText>{skinData?.averageScore}점</S.ScoreText>
          </S.ScoreBox>
        </S.ResultBox>
      ) : (
        <></>
      )}
      {/* TODO : makeup-get 연결할 때 같이 하기 */}
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
