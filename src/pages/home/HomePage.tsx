import Header from "@components/commons/header/Header";

import CardContainer from "./components/CardContainer/CardContainer";
import * as S from "./HomaPage.styled";

const HomePage = () => {
  return (
    <>
      <Header left="beautiq" right="hambuger" />
      <S.HomePageWrapper>
        <S.HomeImage />
        <CardContainer />
      </S.HomePageWrapper>
    </>
  );
};

export default HomePage;
