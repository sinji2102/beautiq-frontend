import Header from "@components/commons/header/Header";
import * as S from "@pages/detailPage/DetailPage.styled";
import { useLocation } from "react-router-dom";

const data = {
  id: "analysis_1a2b3c",
  userId: "user_test_001",
  SkinAnalysisScores: {
    pigmentationReg: 80, // 색소침착
    moistureReg: 100, // 건조 (수분)
    elasticityReg: 60, // 처짐 (탄력)
    wrinkleReg: 80, // 주름
    poreReg: 80, // 모공
  },
  feedback:
    "전반적으로 피부 상태가 양호합니다. 다만, 주름 점수가 다소 낮으니 아이크림 사용과 수분 섭취에 신경 써주세요.",
  averageScore: 81.2,
  createdAt: "2025-11-07T14:30:15Z",
};

const DetailPage = () => {
  const location = useLocation();

  // 각 피부 점수에 따른 텍스트 변화 시키는 함수
  const getScoreStatusText = (score: number) => {
    if (score >= 80) return "양호";
    if (score >= 60) return "주의";
    return "위험";
  };

  // 점수 표시용 데이터 배열
  const scoreItems = [
    { label: "건조", key: "moistureReg" },
    { label: "색소침착", key: "pigmentationReg" },
    { label: "모공", key: "poreReg" },
    { label: "처짐", key: "elasticityReg" },
    { label: "주름", key: "wrinkleReg" },
  ];

  return (
    <>
      <Header left="back" text={location.state.dateStr + " 분석결과"} />

      <S.ScoreBoardWrapper>
        {scoreItems.map(({ label, key }) => {
          const score = data.SkinAnalysisScores[key as keyof typeof data.SkinAnalysisScores];
          return (
            <S.ScoreBoardContainer key={key} score={score}>
              <S.ScoreBoardLeft>{label}</S.ScoreBoardLeft>
              <S.ScoreBoardRight>
                <S.ScoreBoardRightTop score={score}>
                  {getScoreStatusText(score)}
                </S.ScoreBoardRightTop>
                <S.ScoreBoardRightBottom>{score}/100</S.ScoreBoardRightBottom>
              </S.ScoreBoardRight>
            </S.ScoreBoardContainer>
          );
        })}
      </S.ScoreBoardWrapper>


      
    </>
  );
};

export default DetailPage;
