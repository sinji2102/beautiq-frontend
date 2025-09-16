import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import DatePicker from "react-datepicker";

import * as S from "./Calendar.styled";

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <S.CalendarWrapper>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      />
    </S.CalendarWrapper>
  );
};

export default Calendar;
