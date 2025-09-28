import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { muiTheme } from "@styles/theme";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

import { StyledStaticDatePicker } from "./Calendar.styled";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider theme={muiTheme}>
        <StyledStaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          slots={{
            actionBar: () => null,
          }}
        />
      </MuiThemeProvider>
    </LocalizationProvider>
  );
};

export default Calendar;
