// MUI 라이브러리 스타일 적용하는 컴포넌트? -> 테마 적용
import { createTheme, ThemeProvider } from "@mui/material/styles";
// MUI 라이브러리가 한국 시간과 날짜를 달력에 적용하기 위한 컴포넌트들
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { StyledStaticDatePicker } from "./Calendar.styled";

const theme = createTheme();

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter = {AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <StyledStaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          // ActionBar를 완전히 제거 -> styled 에서는 제거할 방법을 못찾음
          slots={{
            actionBar: () => null, 
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default Calendar;
