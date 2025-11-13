// 👈 API 응답 타입 import (경로는 실제 파일 위치에 맞게 수정해주세요)
import type {
  MonthlySkinStatusResponse
} from "@apis/domain/skin-analysis/api";
import {
  getSkinAnalysisDaily, // 👈 일별 조회 API import 추가
  getSkinAnalysisMonthly,
} from "@apis/domain/skin-analysis/api";
import type { SkinStatusType } from "@custom-types/skinStatus";
import { useModal } from "@hooks/useModal";
import { styled as MUIstyled, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { muiTheme } from "@styles/theme";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react"; // 👈 useEffect 추가
import { useNavigate } from "react-router-dom";

import CalendarCustomModal from "../calendarCustomModal/CalendarCustomModal";
import { StyledStaticDatePicker } from "./Calendar.styled";

// 👈 기존 MonthlySkinStatusType 은 API 응답 타입의 일부일 것이므로,
//    API 타입 파일에서 import 한 MonthlySkinStatusResponse 를 사용합니다.
//    (만약 MonthlySkinStatusResponse 구조가 { MonthlySkinStatus: ... } 라면
//     이 타입 정의가 필요할 수 있으나, 우선 API 타입을 직접 사용합니다.)

// 분석 결과 일별 조회 API type
export interface DailyDate {
  id: string;
  date: string; // ISO 형식 날짜 문자열 (예: "2024-08-18T09:12")
}

// 타입 확장 PickersDayProps
interface CustomPickersDayProps extends PickersDayProps {
  // 👈 API에서 받은 월별 데이터 배열 타입으로 수정
  monthlySkinData?: MonthlySkinStatusResponse["days"]; // 'days'는 예시 속성명입니다. 실제 응답에 맞게 수정 필요
}

// 👈 1. API 응답 데이터가 { days: [...] } 형태라고 가정합니다.
//    (실제 'MonthlySkinStatusResponse' 타입에 맞게 'days'를 수정하세요.)
//    예: MonthlySkinStatusResponse 가 { dailyStatuses: [...] } 라면
//        monthlySkinData?.dailyStatuses ?? []
//    예: MonthlySkinStatusResponse 가 [...] (배열 자체) 라면
//        monthlySkinData ?? []
//    
//    기존 코드로 미루어 보아, MonthlySkinStatusResponse가 
//    { MonthlySkinStatus: [...] } 형태일 수 있습니다.
//    그렇다면 `useState<MonthlySkinStatusResponse | null>(null)`로 두고
//    아래 `slotProps`에서 `monthlyData?.MonthlySkinStatus ?? []` 를 사용하세요.

// 2. 이 예제에서는 MonthlySkinStatusResponse가 
//    { days: Array<{ skinStatus: SkinStatusType, createAt: string }> }
//    라고 가정하고 진행합니다.

// 개별 날짜 커스텀 스타일
const CustomDay = MUIstyled(PickersDay, { shouldForwardProp: (prop) => prop !== "skinStatus" })<{
  skinStatus?: SkinStatusType;
}>(({ theme, skinStatus }) => {
  // ... (기존 스타일 동일)
  return {
    "&.MuiPickersDay-root.Mui-selected": {
      backgroundColor:
        skinStatus === "GOOD"
          ? theme.palette.primary.light
          : skinStatus === "CAUTION"
            ? theme.palette.primary.main
            : theme.palette.primary.dark,
    },
  };
});

// 개별 날짜 비활성화 스타일
const DisabledDay = MUIstyled(PickersDay)(() => ({
  // ... (기존 스타일 동일)
  backgroundColor: "white !important",
  color: "black !important",
  pointerEvents: "none",
  "&:hover": {
    backgroundColor: "white !important",
  },
  "&.MuiPickersDay-today": {
    border: "none",
  },
}));

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const navigate = useNavigate();

  // 👈 3. API 데이터를 저장할 State
  const [monthlyData, setMonthlyData] = useState<MonthlySkinStatusResponse | null>(null);
  // 👈 4. 사용자가 보고 있는 현재 월을 저장할 State
  const [currentViewMonth, setCurrentViewMonth] = useState<Dayjs>(dayjs());
  // 👈 5. 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 👈 6. 현재 보고 있는 월(currentViewMonth)이 바뀔 때마다 API를 새로 호출
  useEffect(() => {
    const fetchMonthlyData = async () => {
      setIsLoading(true); // 새 데이터 로딩 시작
      try {
        const year = currentViewMonth.year();
        const month = currentViewMonth.month() + 1; // dayjs는 0-11, API는 1-12
        
        const data = await getSkinAnalysisMonthly(year, month);
        setMonthlyData(data);
      } catch (error) {
        console.error("월별 데이터를 불러오는 데 실패했습니다:", error);
        setMonthlyData(null); // 에러 발생 시 데이터 초기화
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchMonthlyData();
  }, [currentViewMonth]); // 👈 currentViewMonth가 변경될 때마다 이 훅이 실행됩니다.


  // 개별 날짜 커스텀시 호출되는 함수
  const ServerDay = (props: CustomPickersDayProps) => {
    // 👈 prop 이름을 'monthlySkinData'로 변경 (slotProps와 일치)
    const { monthlySkinData = [], day, outsideCurrentMonth, ...other } = props;
    const { modalOpen } = useModal();

    const dateStr = day.format("YYYY-MM-DD");
    
    // 👈 'monthlySkinData' (API 응답)에서 날짜 찾기
    // (API 응답 구조에 'createAt'이 아닌 'date' 라면 'd.date'로 수정)
    const dayData = monthlySkinData.find((d) => d.createAt === dateStr);
    const isSelected = !props.outsideCurrentMonth && !!dayData;

    // 활성화된 날짜 클릭시 호출되는 이벤트 리스너
    // 👈 7. 'async' 함수로 변경
    const handleClickCalendar = async () => {
      // 👈 8. 날짜별 데이터 API 호출
      const dailyData = await getSkinAnalysisDaily(dateStr);

      // 👈 9. API 응답(dailyData)이 없거나, DailyDates 배열이 비어있으면 중단
      if (!dailyData || !dailyData.DailyDates || dailyData.DailyDates.length === 0) {
        // (선택사항) 사용자에게 알림
        // alert("해당 날짜에 분석 기록이 없습니다.");
        console.log("No daily data found for this date.");
        return;
      }

      // 👈 10. 'tempDayData' 대신 실제 API 응답 'dailyData' 사용
      if (dailyData.DailyDates.length === 1) {
        navigate("/detailPage", {
          state: {
            // 👈 상세 페이지는 날짜(dateStr)보다 분석 ID(analysisId)를 원할 확률이 높습니다.
            analysisId: dailyData.DailyDates[0].id,
            dateStr: dateStr, // 기존 로직 유지를 위해 dateStr도 전달
          },
        });
      } else {
        modalOpen({
          variant: "primary",
          type: "custom",
          title: "알림", // "알림" 보다는 "분석 기록 선택" 등이 좋습니다.
          comment: "모달 테스트입니다.", // 모달 코멘트 수정 필요
          closeOutside: true,
          children: (
            <CalendarCustomModal
              dateStr={dateStr}
              DailyDates={dailyData.DailyDates} // 👈 'tempDayData' 대신 'dailyData' 전달
              navigate={navigate}
            />
          ),
        });
      }
    };

    if (dayData) {
      return (
        <CustomDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          selected={isSelected}
          onClick={handleClickCalendar}
          skinStatus={dayData.skinStatus}
        />
      );
    }

    return <DisabledDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} disabled />;
  };

  // 👈 11. 로딩 중일 때 표시할 UI (선택사항이지만 권장)
  if (isLoading && !monthlyData) {
     // TODO: 로딩 스피너 컴포넌트 등으로 대체
     return <div>캘린더 데이터를 불러오는 중...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider theme={muiTheme}>
        <StyledStaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          // 👈 12. 월 변경 시 'currentViewMonth' state 업데이트
          onMonthChange={(newDate) => setCurrentViewMonth(newDate)} 
          slots={{
            actionBar: () => null,
            day: ServerDay,
          }}
          slotProps={{
            day: {
              // 👈 13. API 응답(monthlyData)을 prop으로 전달
              // 'days'는 MonthlySkinStatusResponse의 실제 속성명으로 변경해야 합니다.
              // 만약 응답이 { MonthlySkinStatus: [...] } 형태라면
              // monthlySkinData: monthlyData?.MonthlySkinStatus ?? [],
              // 만약 응답이 [...] (배열) 형태라면
              // monthlySkinData: monthlyData ?? [],
              monthlySkinData: monthlyData?.days ?? [], // 'days'는 응답에 맞게 수정!
            } as CustomPickersDayProps,
          }}
          // 👈 로딩 중에는 날짜 클릭 등 상호작용 비활성화
          loading={isLoading}
        />
      </MuiThemeProvider>
    </LocalizationProvider>
  );
};

export default Calendar;