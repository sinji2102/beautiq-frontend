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
    { skinStatus: "GOOD", createAt: "2025-09-25" },
    { skinStatus: "CAUTION", createAt: "2025-09-26" },
    { skinStatus: "DANGER", createAt: "2025-09-27" },
  ],
};

interface MonthlySkinStatusType {
  skinStatus: SkinStatusType;
  createAt: string;
}

interface CustomPickersDayProps extends PickersDayProps {
  MonthlySkinStatus?: MonthlySkinStatusType[];
}

const GoodDay = MUIstyled(PickersDay)(({ theme }) => ({
  "&.MuiPickersDay-root.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const CautionDay = MUIstyled(PickersDay)(({ theme }) => ({
  "&.MuiPickersDay-root.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const DangerDay = MUIstyled(PickersDay)(({ theme }) => ({
  "&.MuiPickersDay-root.Mui-selected": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// const ExceptDay = MUIstyled(PickersDay)(({ theme }) => ({
//   "&.MuiPickersDay-root.Mui-selected": {
//     backgroundColor: theme.palette.common.black,
//     // font: theme.palette.common.black,
//   },
// }));

const Calendar = () => {
  // const [highlightedDays] = useState(["2025-09-01", "2025-09-09", "2025-09-21"]);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  //higlight the dates in highlightedDays array
  const ServerDay = (props: CustomPickersDayProps) => {
    const { MonthlySkinStatus = [], day, outsideCurrentMonth, ...other } = props;
    // const isSelected =
    //   !props.outsideCurrentMonth && MonthlySkinStatus.includes(day.format("YYYY-MM-DD"));

    const dateStr = day.format("YYYY-MM-DD");
    const dayData = MonthlySkinStatus.find((d) => d.createAt == dateStr);
    const isSelected = !props.outsideCurrentMonth && !!dayData;

    if (dayData) {
      switch (dayData.skinStatus) {
        case "GOOD":
          return (
            <GoodDay
              {...other}
              outsideCurrentMonth={outsideCurrentMonth}
              day={day}
              selected={isSelected}
            />
          );
        case "CAUTION":
          return (
            <CautionDay
              {...other}
              outsideCurrentMonth={outsideCurrentMonth}
              day={day}
              selected={isSelected}
            />
          );
        case "DANGER":
          return (
            <DangerDay
              {...other}
              outsideCurrentMonth={outsideCurrentMonth}
              day={day}
              selected={isSelected}
            />
          );
      }
    }

    return <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />;
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
