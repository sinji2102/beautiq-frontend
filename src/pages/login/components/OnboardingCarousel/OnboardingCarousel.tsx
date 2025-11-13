import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./OnboardingCarousel.styled";

const OnboardingCarousel = () => {
  const slides = [
    {
      image: "/images/onboarding1.jpg",
      text: `AI 피부 분석 기능을 활용해\n피부를 자세히 분석하세요.`,
    },
    {
      image: "/images/onboarding2.jpg",
      text: `AI 스타일 추천 기능을 활용해\n나만의 스타일을 찾아보세요.`,
    },
    {
      image: "/images/onboarding3.jpg",
      text: `단순히 분석에서 끝나는 게 아닌,\n지속적으로 피부를 관리하세요.`,
    },
  ];

  return (
    <S.CarouselWrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => {
          const [title, subtitle] = slide.text.split("\n");

          return (
            <SwiperSlide key={index}>
              <S.SlideContent>
                <S.SlideImage src={slide.image} alt={`slide-${index}`} />
                <S.TextWrapper>
                  <S.SlideSubTitle>{title}</S.SlideSubTitle>
                  <S.SlideTitle>{subtitle}</S.SlideTitle>
                </S.TextWrapper>
              </S.SlideContent>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.CarouselWrapper>
  );
};

export default OnboardingCarousel;
