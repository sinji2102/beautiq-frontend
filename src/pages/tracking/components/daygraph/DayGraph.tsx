import { useTheme } from "@emotion/react";
import * as S from "@pages/tracking/components/daygraph/DayGraph.styled";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// #region Sample data

const data = {
  within60Days: [
    {
      dayDate: "2025-09-06",
      point: 0,
    },
    {
      dayDate: "2025-09-07",
      point: 80,
    },
    // 아래있는 데이터를 주석 처리 하면 60일 내에 4회 이상의 피부 측정 기록이 나옵니다.
    {
      dayDate: "2025-09-08",
      point: 60,
    },
    {
      dayDate: "2025-09-09",
      point: 100,
    },
    {
      dayDate: "2025-09-10",
      point: 80,
    },
  ],
  currentMonth: {
    monthDate: "2D025-09",
    point: 80,
  },
};

const data1 = {
  yearlyHistory: [
    {
      monthDate: "2025-05",
      point: 85,
    },
    {
      monthDate: "2025-06",
      point: 90,
    },
    // 아래 있는 데이터 주석 처리 하면 3달 미만으로 검사시 뜨는 텍스트 확인하실 수 있습니다.
    {
      monthDate: "2025-07",
      point: 75,
    },
    {
      monthDate: "2025-08",
      point: 88,
    },
    {
      monthDate: "2025-09",
      point: 95,
    },
  ],
  feedback: "지난 달에 비해 점수가 크게 향상되었습니다. 잘하고 있어요!",
};
// #endregion

const DayGraph = () => {
  const theme = useTheme();

  const formattedData = data.within60Days.map((item) => ({
    ...item,
    dayDate: item.dayDate.substring(5), // "09-06"
  }));

  const formattedData1 = data1.yearlyHistory.map((item) => ({
    ...item,
    // 'monthDate'를 사용하고 "월"을 붙입니다.
    dayDate: item.monthDate.substring(5) + "월", // "05월"
  }));

  const show60DayChart = formattedData.length >= 4;

  const showMonthChart = formattedData1.length >= 3;

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
                <S.AvgRightText>{data.currentMonth.point}점</S.AvgRightText>
                <S.AvgRightContent>양호</S.AvgRightContent>
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
              <S.FeedBackText>{data1.feedback}</S.FeedBackText>
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
