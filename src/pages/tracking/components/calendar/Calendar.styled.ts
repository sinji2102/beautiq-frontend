import styled from "@emotion/styled";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { getTypography } from "@styles/typography";

export const StyledStaticDatePicker = styled(StaticDatePicker)`

  .MuiDateCalendar-root {
    width: 100%;
  }

  .MuiPickersCalendarHeader-label {
    ${({ theme }) => getTypography("body1Long")({ theme })}
  }

  .MuiDayCalendar-weekDayLabel {
    flex: 1 0 auto;
    text-align: center;
    ${({ theme }) => getTypography("body1Long")({ theme })}
  }

  .MuiDayCalendar-weekContainer {
    justify-content: space-between;
  }

  .MuiPickersDay-root.Mui-selected {

  }

  .MuiPickersDay-today {
  }
`;

