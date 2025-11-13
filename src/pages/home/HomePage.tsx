import Header from "@components/commons/header/Header";
import Sidebar from "@components/commons/sidebar/Sidebar";
import { useState } from "react";

import CardContainer from "./components/CardContainer/CardContainer";
import RecentAnalysisCard from "./components/RecentAnalysisCard/RecentAnalysisCard";
import TodayTip from "./components/TodayTip/TodayTip";
import * as S from "./HomePage.styled";

const HomePage = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleClickSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <Header left="beautiq" right="hambuger" handleClickHamburger={handleClickSidebar} />
      <S.HomePageWrapper>
        <S.HomeImage src="/images/homeImage.png" alt="Home Image" />
        <CardContainer />
        <RecentAnalysisCard />
        <TodayTip />
      </S.HomePageWrapper>
      <Sidebar isOpen={sidebar} onClose={handleClickSidebar} />
    </>
  );
};

export default HomePage;
