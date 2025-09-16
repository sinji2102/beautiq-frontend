import styled from "@emotion/styled";

import { getTypography } from "../../../../styles/typography";

export const CalendarWrapper = styled.div`
  width: 100%;

  .react-datepicker {
    width: 100%;
    border: none;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    margin: 0.5rem;
    ${getTypography("body1Long")};
  }

  .react-datepicker__day--outside-month {
    color: #ccc; !important;
    fill: ${({ theme }) => theme.colors.gray[100]};
    pointer-events: none;
  }

`;
