import Header from "@components/commons/header/Header";

import Calendar from "./components/calendar/Calendar";
import * as S from "./TrackingPage.styled";

const TrackingPage = () => {
  return (
    <>
      <Header left="back" text="피부 히스토리" />
      <S.TrackingPageWrapper>
          <Calendar />
      </S.TrackingPageWrapper>
    </>
  );
};

export default TrackingPage;
