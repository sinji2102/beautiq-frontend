import Header from "@components/commons/header/Header";

import * as S from "./TrackingPage.styled";

const TrackingPage = () => {
  return (
    <>
      <Header left="back" text="피부 히스토리" />
      <S.TrackingPageWrapper></S.TrackingPageWrapper>
    </>
  );
};

export default TrackingPage;
