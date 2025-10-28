import "swiper/css";
import "swiper/css/pagination";

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
            <S.Card>
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
