import "swiper/css";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./MakeupCarousel.styled";

type MakeUp = {
  makeUpId: number;
  imageName: string;
  imageUrl: string;
  keywords: string[];
  createdAt: string;
};

interface MakeupCarouselProps {
  makeUps: MakeUp[];
}

const MakeUpCarousel = ({ makeUps }: MakeupCarouselProps) => {
  const navigate = useNavigate();

  const handleClickCard = (makeUpId: number) => {
    // TODO : 페이지 생성 시 연결
    navigate(`/my/recommend-style/${makeUpId}`);
  };

  return (
    <S.CarouselWrapper>
      <Swiper
        slidesPerView={2.2}
        slidesPerGroup={2}
        spaceBetween={24}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{ paddingBottom: "24px" }}
      >
        {makeUps.map((makeUp) => (
          <SwiperSlide key={makeUp.makeUpId}>
            <S.Card onClick={() => handleClickCard(makeUp.makeUpId)}>
              <S.ImageBox>
                <img src={makeUp.imageUrl} alt={makeUp.imageName} />
              </S.ImageBox>

              <S.InfoBox>
                <S.KeywordList>
                  {makeUp.keywords.slice(0, 2).map((keyword) => (
                    <S.Keyword key={keyword}>{keyword}</S.Keyword>
                  ))}
                </S.KeywordList>

                <S.Title>{makeUp.imageName || makeUp.createdAt}</S.Title>
              </S.InfoBox>
            </S.Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.CarouselWrapper>
  );
};

export default MakeUpCarousel;
