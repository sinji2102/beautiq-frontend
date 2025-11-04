import Header from "@components/commons/header/Header";

import MakeUpCarousel from "./components/Carousel/MakeupCarousel";
import MakeupList from "./components/MakeupList/MakeupList";
import * as S from "./RecommendStylePage.styled";

const tempUserData = {
  user: "윤신지",
};

const tempData = [
  {
    makeUpId: 1,
    imageName: "테스트1",
    imageUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791158364656.jpg",
    keywords: ["청량", "파스텔톤", "테스트", "예시"],
    createdAt: "2025-02-03",
  },
  {
    makeUpId: 2,
    imageName: "테스트1",
    imageUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791158364656.jpg",
    keywords: ["청량", "파스텔톤"],
    createdAt: "2025-02-03",
  },
  {
    makeUpId: 3,
    imageName: "테스트1",
    imageUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791158364656.jpg",
    keywords: ["청량", "파스텔톤"],
    createdAt: "2025-02-03",
  },
];

const RecommendStylePage = () => {
  return (
    <S.RecommendWrapper>
      <Header left="back" text="추천 스타일 확인" />
      <S.Title>{`${tempUserData.user}님이 저장한 \n스타일이에요`}</S.Title>
      <S.SubTitle>최근 저장한 스타일</S.SubTitle>
      <MakeUpCarousel makeUps={tempData} />
      <MakeupList makeUps={tempData} />
    </S.RecommendWrapper>
  );
};

export default RecommendStylePage;
