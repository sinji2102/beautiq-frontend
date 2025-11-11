import Button from "@components/commons/button/Button";
import { useModal } from "@hooks/useModal";
import * as S from "@pages/tracking/components/calendarCustomModal/CalendarCustomModal.styled";
import { useNavigate } from "react-router-dom";

import type { DailyDate } from "../calendar/Calendar";

// CustomModal에 전달할 프롭 타입
interface CustomModalProps {
  dateStr: string;
  DailyDates: DailyDate[];
  navigate: ReturnType<typeof useNavigate>;
}

const CalendarCustomModal = ({ dateStr, DailyDates, navigate }: CustomModalProps) => {
  const { modalClose } = useModal();

  const CustomModalClick = () => {
    navigate("/detailPage", {
      state: {
        dateStr: dateStr,
      },
    });

    modalClose();
  };

  return (
    <S.CalendarCustomModalWrapper>
      <S.CalendarCustomTitle>확인을 원하는 결과를 선택해주세요.</S.CalendarCustomTitle>
      <S.CalendarCustomSubTitler>
        {dateStr}에 다수의 피부 히스토리가 있습니다.
      </S.CalendarCustomSubTitler>

      <S.CalendarButtonWrapper>
        {DailyDates.map((item) => (
          <Button size="large" variant="line" onClick={CustomModalClick}>
            ({item.date})
          </Button>
        ))}
      </S.CalendarButtonWrapper>
    </S.CalendarCustomModalWrapper>
  );
};

export default CalendarCustomModal;
