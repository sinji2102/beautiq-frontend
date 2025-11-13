import type {
  SixtyDaySkinPointsResponse,
  YearlyDaySkinPointsResponse,
} from "@apis/domain/skin-analysis/api";
import {
  getSkinAnalysisTrends60Days,
  getSkinAnalysisTrendsYearly,
} from "@apis/domain/skin-analysis/api";
import { useTheme } from "@emotion/react";
import * as S from "@pages/tracking/components/daygraph/DayGraph.styled";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const DayGraph = () => {
  const theme = useTheme();

  // API 데이터 저장할 State (초기값은 null)
  const [data, setData] = useState<SixtyDaySkinPointsResponse | null>(null);
  const [data1, setData1] = useState<YearlyDaySkinPointsResponse | null>(null);

  useEffect(() => {
    const fectchData = async () => {
      try {
        // API 호출에 사용될 데이터 생성

        const today = new Date().toISOString().slice(0, 10);
        const currentYear = new Date().getFullYear();

        //API 병렬 호출
        const [result60Days, resultYearly] = await Promise.all([
          getSkinAnalysisTrends60Days(today),
          getSkinAnalysisTrendsYearly(currentYear),
        ]);

        // 받아온 API DATA 저장
        setData(result60Days);
        setData1(resultYearly);
      } catch (error) {
        console.error("error", error);
      }
    };

    fectchData();
  }, []);

  // 이번달 평균 점수에 따른 텍스트를 계산하는 함수
  const getScoreStatusText = (score: number) => {
    if (score >= 80) {
      return "양호";
    }
    if (score >= 60) {
      return "주의";
    }
    return "위험";
  };

  // 날짜별, 년도 제거
  const formattedData = data?.within60Days.map((item) => ({
    ...item,
    dayDate: item.dayDate.substring(5), // "09-06"
  }));

  // 월별, "월" 문자열 추가
  const formattedData1 = data1?.yearlyHistory.map((item) => ({
    ...item,
    dayDate: item.monthDate.substring(5) + "월", // "05월"
  }));

  const show60DayChart = (formattedData?.length ?? 0) >= 4;

  const showMonthChart = (formattedData1?.length ?? 0) >= 3;

  return (
    <>
      <S.LineChartWrapper>
        <S.LineChartTitleWrapper>
          <S.FaceGraphIcon />
          <S.LineChartTitle>최근 60일 피부 점수 트렌드</S.LineChartTitle>
        </S.LineChartTitleWrapper>

        {show60DayChart ? (
          // 3. TRUE: 차트와 평균 점수를 Fragment(<>)로 묶어 반환
          <>
            <LineChart
              style={{
                width: "100%",
                aspectRatio: 1.618,
                maxWidth: 600,
                pointerEvents: "none",
              }}
              responsive
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="point"
                stroke={theme.colors.primary[400]}
                strokeWidth={1}
                name="My data series name"
              />
              <XAxis
                dataKey="dayDate"
                tick={{
                  fontFamily: "Pretendard",
                  fontSize: 8,
                  fill: theme.colors.gray[700],
                }}
              />
              <YAxis
                width="auto"
                label={{ position: "insideLeft", angle: -90 }}
                domain={[0, 100]}
                tick={{
                  fontFamily: "Pretendard",
                  fontSize: 8,
                  fill: theme.colors.gray[700],
                }}
              />
            </LineChart>

            <S.LineCharAvgtWrapper>
              <S.AvgLeft>이번달 평균</S.AvgLeft>
              <S.AvgRightWrapper>
                <S.AvgRightText>{data?.currentMonth.point}점</S.AvgRightText>
                <S.AvgRightContent score={data?.currentMonth.point ?? 0}>
                  {getScoreStatusText(data?.currentMonth.point ?? 0)}
                </S.AvgRightContent>
              </S.AvgRightWrapper>
            </S.LineCharAvgtWrapper>
          </>
        ) : (
          // 4. FALSE: 텍스트 메시지만 반환
          <S.LineChartInformation>
            {`60일 내에 4회 이상의 피부 측정 기록이 있어야\n 피부 점수 트렌드를 확인할 수 있어요`}
          </S.LineChartInformation>
        )}
      </S.LineChartWrapper>

      <S.LineChartWrapper>
        <S.LineChartTitleWrapper>
          <S.FaceGraphIcon />
          <S.LineChartTitle>연간 피부 점수 트렌드</S.LineChartTitle>
        </S.LineChartTitleWrapper>

        {showMonthChart ? (
          <>
            <LineChart
              style={{
                width: "100%",
                aspectRatio: 1.618,
                maxWidth: 600,
                pointerEvents: "none",
              }}
              responsive
              data={formattedData1}
              margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="point"
                stroke={theme.colors.primary[400]}
                strokeWidth={1}
                name="My data series name"
              />
              <XAxis
                dataKey="dayDate"
                tick={{
                  fontFamily: "Pretendard",
                  fontSize: 8,
                  fill: theme.colors.gray[700],
                }}
              />
              <YAxis
                width="auto"
                label={{ position: "insideLeft", angle: -90 }}
                domain={[0, 100]}
                tick={{
                  fontFamily: "Pretendard",
                  fontSize: 8,
                  fill: theme.colors.gray[700],
                }}
              />
            </LineChart>

            <S.FeedBackWrapper>
              <S.FeedBackTitle>피부 분석 인사이트</S.FeedBackTitle>
              <S.FeedBackText>{data1?.feedback}</S.FeedBackText>
            </S.FeedBackWrapper>
          </>
        ) : (
          // 4. FALSE: 텍스트 메시지만 반환
          <S.LineChartInformation>
            {`3달 이상의 피부 측정 기록이 있어야\n 피부 점수 트렌드를 확인할 수 있어요`}
          </S.LineChartInformation>
        )}
      </S.LineChartWrapper>
    </>
  );
};

export default DayGraph;
