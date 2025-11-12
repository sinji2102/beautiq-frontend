import Header from "@components/commons/header/Header";
import * as S from "@pages/detailPage/DetailPage.styled";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// DetailPage의 데이터를 기반으로 차트를 그리는 컴포넌트
const SkinChart = ({ data }: { data: { name: string; uv: number }[] }) => {
  return (
    // [수정 1] 고정 값 327 대신 "100%"로 변경
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={data}
        // [수정 2] margin 속성 추가 (그래프 내부 여백 조절)
        margin={{
          top: 10,
          right: 10,
          left: -20, // Y축 라벨(숫자)을 왼쪽 패딩 영역으로 살짝 이동
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv">
          {data.map((entry, index) => {
            let color = "#CC4B86"; // 기본 (60 이하)
            // [참고] 이 부분은 이전 요청에서 '이상(>=)'이었으나,
            // 방금 주신 코드의 '초과(>)' 기준으로 그대로 두었습니다.
            if (entry.uv > 80) {
              color = "#FFD1E1"; // 80 초과
            } else if (entry.uv > 60) {
              color = "#F384AD"; // 60 초과
            }
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// DetailPage의 상세 점수 데이터
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/tracking");
    }
  }, [location.state, navigate]);

  // 각 피부 점수에 따른 텍스트 변화 시키는 함수
  const getScoreStatusText = (score: number) => {
    if (score > 80) return "양호";
    if (score > 60) return "주의";
    return "위험";
  };

  // 점수 표시 및 차트 데이터 생성을 위한 기준 배열
  const scoreItems = [
    { label: "건조", key: "moistureReg" },
    { label: "색소침착", key: "pigmentationReg" },
    { label: "모공", key: "poreReg" },
    { label: "처짐", key: "elasticityReg" },
    { label: "주름", key: "wrinkleReg" },
  ];

  // 차트에 전달할 데이터 형식으로 변환
  const chartData = scoreItems.map(({ label, key }) => ({
    name: label,
    // data.SkinAnalysisScores에서 'key'에 해당하는 점수를 찾아 'uv' 값으로 할당
    uv: data.SkinAnalysisScores[key as keyof typeof data.SkinAnalysisScores],
  }));

  return (
    <>
      <Header left="back" text={location.state?.dateStr + " 분석결과"} />

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

      <S.BarGraphWrapper>
        <S.BarGraphTitle>피부 종합 진단</S.BarGraphTitle>
        <S.CompositeScoreWrapper>
          <S.CompositeScoreTitle>종합 점수</S.CompositeScoreTitle>
          <S.CompositeScoreContentWrapper>
            <S.CompositeScoreContent>
              <S.CompositeScoreLeft>{data.averageScore}</S.CompositeScoreLeft>
              <S.CompositeScoreRight>/100</S.CompositeScoreRight>
            </S.CompositeScoreContent>
            <S.ScoreBoardRightTop score={data.averageScore}>
              {getScoreStatusText(data.averageScore)}
            </S.ScoreBoardRightTop>
          </S.CompositeScoreContentWrapper>
        </S.CompositeScoreWrapper>
        <SkinChart data={chartData} />
        <S.FeedBackWrapper>
          <S.FeedBackTitle>AI 분석 피드백</S.FeedBackTitle>
          <S.FeedBackText>{data.feedback}</S.FeedBackText>
        </S.FeedBackWrapper>
      </S.BarGraphWrapper>
    </>
  );
};

export default DetailPage;
