import type { SkinStatusType } from "@custom-types/skinStatus";
import { useModal } from "@hooks/useModal";
import { styled as MUIstyled, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { muiTheme } from "@styles/theme";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StyledStaticDatePicker } from "./Calendar.styled";

// 분석 결과 월별 조회 API type
interface MonthlySkinStatusType {
  skinStatus: SkinStatusType;
  createAt: string;
}

// 분석 결과 일별 조회 API type
interface DailyDate {
  id: string;
  date: string; // ISO 형식 날짜 문자열 (예: "2024-08-18T09:12")
}

// 타입 확장 PickersDayProps
interface CustomPickersDayProps extends PickersDayProps {
  MonthlySkinStatus?: MonthlySkinStatusType[];
  DailyDates?: DailyDate[];
}

// TODO : skinStatus enum 생성하기
const tempData = {
  MonthlySkinStatus: [
    { skinStatus: "CAUTION", createAt: "2025-09-10" },
    { skinStatus: "CAUTION", createAt: "2025-10-10" },
    { skinStatus: "GOOD", createAt: "2025-10-25" },
    { skinStatus: "CAUTION", createAt: "2025-10-26" },
    { skinStatus: "DANGER", createAt: "2025-10-27" },
    { skinStatus: "CAUTION", createAt: "2025-10-27" },
  ],
};

// 분석 결과 일변 조회 임시 데이터
const tempDayData = {
  DailyDates: [
    { id: "a", date: "2025-10-27T09:12" },
    { id: "b", date: "2025-10-27T10:12" },
  ],
};

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

  // 개별 날짜 커스텀시 호출되는 함수?
  const ServerDay = (props: CustomPickersDayProps) => {
    const { MonthlySkinStatus = [], day, outsideCurrentMonth, ...other } = props;
    const { modalOpen } = useModal();

    // MonthlySkinStatus에 들어있지않은 날짜는 isSelected 비부여
    const dateStr = day.format("YYYY-MM-DD");
    const dayData = MonthlySkinStatus.find((d) => d.createAt == dateStr);
    const isSelected = !props.outsideCurrentMonth && !!dayData;

    // 활성화된 날짜 클릭시 호출되는 이벤트 리스너
    const handleClickCalendar = () => {
      // TODO : 날짜별로 데이터 받아오는 API 연결 => 날짜 별로 받아와서 tempDayData에 저장해야 한다.
      if (tempDayData.DailyDates.length === 1) {
        navigate("/detailPage", {
          state: {
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
          children: <div>테스트</div>,
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
          slots={{
            actionBar: () => null,
            day: ServerDay,
          }}
          slotProps={{
            day: {
              MonthlySkinStatus: tempData.MonthlySkinStatus,
            } as CustomPickersDayProps,
          }}
        />
      </MuiThemeProvider>
    </LocalizationProvider>
  );
};

export default Calendar;
