import type { MonthlySkinStatusResponse } from "@apis/domain/skin-analysis/api";
import { getSkinAnalysisDaily, getSkinAnalysisMonthly } from "@apis/domain/skin-analysis/api";
import type { SkinStatusType } from "@custom-types/skinStatus";
import { useModal } from "@hooks/useModal";
import { styled as MUIstyled, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { muiTheme } from "@styles/theme";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarCustomModal from "../calendarCustomModal/CalendarCustomModal";
import { StyledStaticDatePicker } from "./Calendar.styled";

// 분석 결과 일별 조회 API type
export interface DailyDate {
  id: string;
  date: string; // ISO 형식 날짜 문자열 (예: "2024-08-18T09:12")
}

// 타입 확장 PickersDayProps
interface CustomPickersDayProps extends PickersDayProps {
  monthlySkinData?: MonthlySkinStatusResponse["monthlyHistory"];
  DailyDates?: DailyDate[];
}

// 개별 날짜 커스텀 스타일
const CustomDay = MUIstyled(PickersDay, { shouldForwardProp: (prop) => prop !== "skinStatus" })<{
  skinStatus?: SkinStatusType;
}>(({ theme, skinStatus }) => {
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
  backgroundColor: "white !important",
  color: "black !important",
  pointerEvents: "none", // 클릭 불가
  "&:hover": {
    backgroundColor: "white !important", // hover 효과 제거
  },
  "&.MuiPickersDay-today": {
    border: "none", // 외각선 비활성화
  },
}));

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const navigate = useNavigate();

  const [monthlyData, setMonthlyData] = useState<MonthlySkinStatusResponse | null>(null); // getSkinAnalysisMonthly 응답 데이터
  const [currentViewMonth, setCurrentViewMonth] = useState<Dayjs>(dayjs()); // 상용자가 현재 보는 월을 저장하는 변수

  // 사용자가 달력에서 월을 변경할때마다 호출되는 함수
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        // 사용자가 현재 보는달 기준으로 API에 요청할 파라미터 생성및 호출
        const year = currentViewMonth.year();
        const month = currentViewMonth.month() + 1;

        const data = await getSkinAnalysisMonthly(year, month);
        setMonthlyData(data);
      } catch (error) {
        console.error("getSkinAnalysisMonthly 호출 과정에서 문제 발생 :", error);
        // setMonthlyData(MOCK_CALENDAR_DATA);
      }
    };

    fetchMonthlyData();
  }, [currentViewMonth]);

  // 개별 날짜 커스텀시 호출되는 함수?
  const ServerDay = (props: CustomPickersDayProps) => {
    const { monthlySkinData = [], day, outsideCurrentMonth, ...other } = props;
    const { modalOpen } = useModal();

    // monthlySkinData 들어있지않은 날짜는 isSelected 비부여
    const dateStr = day.format("YYYY-MM-DD");
    const dayData = monthlySkinData.find((d) => d.dayDate == dateStr);
    const isSelected = !props.outsideCurrentMonth && !!dayData;

    // 활성화된 날짜 클릭시 호출되는 이벤트 리스너
    const handleClickCalendar = async () => {
      const dailyData = await getSkinAnalysisDaily(dateStr); // getSkinAnalysisDaily 응답 데이터
      const dailyDates = dailyData?.dailyDates ?? [];

      if (dailyDates.length === 1) {
        navigate("/detail", {
          state: {
            id: dailyDates[0].id,
            dateStr: dateStr,
          },
        });
      } else {
        modalOpen({
          variant: "primary",
          type: "custom",
          title: "알림",
          comment: "모달 테스트입니다.",
          closeOutside: true,
          children: (
            <CalendarCustomModal dateStr={dateStr} DailyDates={dailyDates} navigate={navigate} />
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider theme={muiTheme}>
        <StyledStaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          onMonthChange={(newData) => setCurrentViewMonth(newData)}
          slots={{
            actionBar: () => null,
            day: ServerDay,
          }}
          slotProps={{
            day: {
              monthlySkinData: monthlyData?.monthlyHistory ?? [],
            } as CustomPickersDayProps,
          }}
        />
      </MuiThemeProvider>
    </LocalizationProvider>
  );
};

export default Calendar;
