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
    {
      dayDate: "2025-09-08",
      point: 40,
    },
    {
      dayDate: "2025-09-08",
      point: 60,
    },
    {
      dayDate: "2025-09-09",
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

const DayGraph = () => {
  // 2. 훅을 호출하여 theme 객체를 가져옵니다.
  const theme = useTheme();

  const formattedData = data.within60Days.map((item) => ({
    ...item,
    dayDate: item.dayDate.substring(5), // "09-06"
  }));

  const formattedData1 = data1.yearlyHistory.map((item) => ({
    ...item,
    dayDate: item.monthDate.substring(5) + "월", // "09-06"
  }));

  return (
    <>
      <S.LineChartWrapper>
        <S.LineChartTitle>최근 60일 피부 점수 트렌드</S.LineChartTitle>
        <LineChart
          style={{
            width: "100%",
            aspectRatio: 1.618,
            maxWidth: 600,
            pointerEvents: "none", // 이전 요청(클릭 방지)
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
              fill: theme.colors.gray[700], // 폰트 색상
            }}
          />
          <YAxis
            width="auto"
            label={{ position: "insideLeft", angle: -90 }}
            domain={[0, 100]}
            tick={{
              fontFamily: "Pretendard",
              fontSize: 8,
              fill: theme.colors.gray[700], // 폰트 색상
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
      </S.LineChartWrapper>

      <S.LineChartWrapper>
        <S.LineChartTitle>연간 피부 점수 트렌드</S.LineChartTitle>
        <LineChart
          style={{
            width: "100%",
            aspectRatio: 1.618,
            maxWidth: 600,
            pointerEvents: "none", // 이전 요청(클릭 방지)
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
              fill: theme.colors.gray[700], // 폰트 색상
            }}
          />
          <YAxis
            width="auto"
            label={{ position: "insideLeft", angle: -90 }}
            domain={[0, 100]}
            tick={{
              fontFamily: "Pretendard",
              fontSize: 8,
              fill: theme.colors.gray[700], // 폰트 색상
            }}
          />
        </LineChart>
      </S.LineChartWrapper>
    </>
  );
};

export default DayGraph;
