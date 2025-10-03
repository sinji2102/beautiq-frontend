import type { SkinStatusType } from "@custom-types/skinStatus";
import { styled as MUIstyled, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { muiTheme } from "@styles/theme";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

import { StyledStaticDatePicker } from "./Calendar.styled";

// TODO : skinStatus enum 생성하기
const tempData = {
  MonthlySkinStatus: [
    { skinStatus: "CAUTION", createAt: "2025-10-10" },
    { skinStatus: "GOOD", createAt: "2025-10-25" },
    { skinStatus: "CAUTION", createAt: "2025-10-26" },
    { skinStatus: "DANGER", createAt: "2025-10-27" },
  ],
};

interface MonthlySkinStatusType {
  skinStatus: SkinStatusType;
  createAt: string;
}

interface CustomPickersDayProps extends PickersDayProps {
  MonthlySkinStatus?: MonthlySkinStatusType[];
}

const CustomDay = MUIstyled(PickersDay, { shouldForwardProp: (prop) => prop !== "skinStatus", })<{ skinStatus?: SkinStatusType }>(({ theme, skinStatus }) => {
  return {
    "&.MuiPickersDay-root.Mui-selected": {
      backgroundColor: skinStatus === "GOOD"
        ? theme.palette.primary.light
        : skinStatus === "CAUTION"
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
    },
  };
});

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

  const ServerDay = (props: CustomPickersDayProps) => {
    const { MonthlySkinStatus = [], day, outsideCurrentMonth, ...other } = props;

    // MonthlySkinStatus에 들어있지않은 날짜는 isSelected 비부여
    const dateStr = day.format("YYYY-MM-DD");
    const dayData = MonthlySkinStatus.find((d) => d.createAt == dateStr);
    const isSelected = !props.outsideCurrentMonth && !!dayData;

    // 활성화된 날짜 클릭시 호출되는 이벤트 리스너
    const handleClick = () => {
      if (dayData) {
        console.log("클릭한 날짜:", day.format("YYYY-MM-DD"), "상태:", dayData.skinStatus);
      }
    };

    if (dayData){
      return(
        <CustomDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          selected={isSelected}
          onClick={handleClick}
          skinStatus={dayData.skinStatus} 
        />
      ) 
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
