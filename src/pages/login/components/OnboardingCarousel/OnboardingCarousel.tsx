import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./OnboardingCarousel.styled";

const OnboardingCarousel = () => {
  const images = [
    "/src/assets/images/onboarding1.jpg",
    "/src/assets/images/onboarding2.jpg",
    "/src/assets/images/onboarding3.jpg",
  ];

  return (
    <S.CarouselWrapper>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={0}
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <S.SlideImage src={src} alt={`about-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.CarouselWrapper>
  );
};

export default OnboardingCarousel;
