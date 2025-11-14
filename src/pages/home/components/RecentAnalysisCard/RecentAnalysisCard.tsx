import { getMakeUpListSaved, type MakeUpListResponse } from "@apis/domain/makeup/api";
import { getSkinAnalysisLatest, type SkinAnalysisResponse } from "@apis/domain/skin-analysis/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./RecentAnalysisCard.styled";

const RecentAnalysisCard = () => {
  const navigate = useNavigate();
  const [skinData, setSkinData] = useState<SkinAnalysisResponse>();
  const [makeupData, setMakeupData] = useState<MakeUpListResponse>();

  useEffect(() => {
    const fetchAnalysis = async () => {
      const data = await getSkinAnalysisLatest();
      if (data) {
        setSkinData(data);
      } else {
        console.error("최근 피부 분석 결과를 불러오지 못했습니다.");
      }
    };

    const getLaststSaved = async () => {
      const data = await getMakeUpListSaved(0, 1);
      if (data) {
        setMakeupData(data);
      } else {
        console.error("최근 피부 분석 결과를 불러오지 못했습니다.");
      }
    };

    fetchAnalysis();
    getLaststSaved();
  }, []);

  const getBadgeLabel = (score?: number) => {
    if (score === undefined || score === null) return "양호";
    if (score >= 81) return "양호";
    if (score >= 61) return "주의";
    return "위험";
  };

  if (!skinData && !makeupData?.makeUps?.length) {
    return null;
  }

  return (
    <S.CardContainer>
      <S.CardTitle>
        <S.BubblesIcon />
        최근 분석 결과
      </S.CardTitle>
      {skinData ? (
        <S.ResultBox>
          <S.ItemInfo>
            <S.Title>피부 분석</S.Title>
            <S.DateText>{skinData?.createdAt.split("T")[0]}</S.DateText>
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
      {makeupData?.makeUps?.length ? (
        <S.ResultBox>
          <S.ItemInfo>
            <S.Title>메이크업 추천</S.Title>
            <S.DateText>
              {makeupData?.makeUps?.[0]?.createdAt
                ? makeupData.makeUps[0].createdAt.split("T")[0]
                : ""}
            </S.DateText>
          </S.ItemInfo>
          <S.BadgeContainer>
            {makeupData?.makeUps?.map((item) => {
              return <S.Badge>{item.keywords}</S.Badge>;
            })}
          </S.BadgeContainer>
        </S.ResultBox>
      ) : (
        <></>
      )}

      <S.FullHistoryButton onClick={() => navigate("/tracking")}>
        전체 히스토리 보기
      </S.FullHistoryButton>
    </S.CardContainer>
  );
};

export default RecentAnalysisCard;
