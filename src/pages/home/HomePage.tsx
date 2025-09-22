import Header from "@components/commons/header/Header";

import CardContainer from "./components/CardContainer/CardContainer";
import RecentAnalysisCard from "./components/RecentAnalysisCard/RecentAnalysisCard";
import * as S from "./HomePage.styled";

const HomePage = () => {
  return (
    <>
      <Header left="beautiq" right="hambuger" />
      <S.HomePageWrapper>
        <S.HomeImage />
        <CardContainer />
        <RecentAnalysisCard />
      </S.HomePageWrapper>
    </>
  );
};

export default HomePage;
