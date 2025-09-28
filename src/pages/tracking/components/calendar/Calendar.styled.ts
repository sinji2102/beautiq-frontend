import styled from "@emotion/styled";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { getTypography } from "@styles/typography";

export const StyledStaticDatePicker = styled(StaticDatePicker)`

  /* MUI Calendar의 모든 요소가 부모 너비를 채우도록 설정 */
  .MuiDateCalendar-root {
    ${({ theme }) => getTypography("body1Long")({ theme })};
    width: 100%;
  }

  /* 캘린더 헤더 (e.g., "September 2024") 스타일 */
  .MuiPickersCalendarHeader-label {
    ${({ theme }) => getTypography("body1Long")({ theme })}; 
  }

   /* 요일 라벨 (S, M, T, W, T, F, S) 스타일 */ 
  .MuiDayCalendar-weekDayLabel {
    ${({ theme }) => getTypography("body1Long")({ theme })};
    color: ${({theme}) => theme.colors.black};
    flex: 1 0 auto;
    text-align: center;
  }

  .MuiDayCalendar-weekContainer {
    justify-content: space-evenly;
  }

  /* 각 날짜(Day) 요소의 기본 스타일 */
  .MuiPickersDay-root {
    ${({ theme }) => getTypography("body1Long")({ theme })};
  }

  /* 선택된 날짜 스타일 */
  .MuiPickersDay-root.Mui-selected {
    background-color: ${({theme}) => theme.colors.primary[500]};
    color: ${({theme}) => theme.colors.white};
  }

  /* 오늘 날짜 스타일 */
  .MuiPickersDay-root.Mui-today{
    backgound-color: ${({theme}) => theme.colors.primary[500]};
    border: 1px solid ${({theme}) => theme.colors.primary[500]};
  }

`;
