import { getSkinAnalysisResult, type SkinAnalysisResponse } from "@apis/domain/skin-analysis/api";
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import * as S from "@pages/detailPage/DetailPage.styled";
import { useEffect, useState } from "react";
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
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20, // Y축 라벨(숫자)을 왼쪽 패딩 영역으로 살짝 이동
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
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

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<SkinAnalysisResponse | null>(null);

  useEffect(() => {
    const state = location.state;

    // state나 analysisId가 없으면 페이지 접근 오류로 간주하고 이동
    if (!state || !state.id) {
      console.error("Analysis ID가 없습니다. 페이지를 이동합니다.");
      navigate("/tracking"); // ID 없으면 트래킹 페이지로
      return;
    }

    const fetchAnalysisData = async () => {
      try {
        const result = await getSkinAnalysisResult(state.id);
        setData(result);
      } catch (error) {
        console.error("상세 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchAnalysisData();
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
    name: label ?? "",
    // data.SkinAnalysisScores에서 'key'에 해당하는 점수를 찾아 'uv' 값으로 할당
    uv: data?.skinAnalysis[key as keyof typeof data.skinAnalysis] ?? 0,
  }));

  const RecommandOnClick = () => {
    navigate(`/detail/recommend-product/${data?.id}`);
  };

  return (
    <>
      <Header left="back" text={location.state?.dateStr + " 분석결과"} />

      <S.ScoreBoardWrapper>
        {scoreItems.map(({ label, key }) => {
          const score = data?.skinAnalysis[key as keyof typeof data.skinAnalysis] ?? 0;
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
              <S.CompositeScoreLeft>{data?.averageScore}</S.CompositeScoreLeft>
              <S.CompositeScoreRight>/100</S.CompositeScoreRight>
            </S.CompositeScoreContent>
            <S.ScoreBoardRightTop score={data?.averageScore ?? 0}>
              {getScoreStatusText(data?.averageScore ?? 0)}
            </S.ScoreBoardRightTop>
          </S.CompositeScoreContentWrapper>
        </S.CompositeScoreWrapper>
        <SkinChart data={chartData} />
        <S.FeedBackWrapper>
          <S.FeedBackTitle>AI 분석 피드백</S.FeedBackTitle>
          <S.FeedBackText>{data?.feedback}</S.FeedBackText>
        </S.FeedBackWrapper>
        <S.RecommandButtonWrapper>
          <Button
            size="xlarge"
            children="내 피부에 맞는 제품 추천 보기"
            onClick={RecommandOnClick}
          />
        </S.RecommandButtonWrapper>
      </S.BarGraphWrapper>
    </>
  );
};

export default DetailPage;
