import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CarouselWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .swiper {
    flex-direction: column;
    align-items: center;
  }

  .swiper-pagination-bullets {
    position: static;

    margin-top: 1.6rem;
  }

  .swiper-pagination-bullet {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 0.8rem !important;

    background-color: ${({ theme }) => theme.colors.gray[200]};
    opacity: 1;

    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.primary[200]};
    border-radius: 4px;
  }
`;

export const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 44rem;
  object-fit: cover;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 1.6rem;

  text-align: center;
`;

export const SlideTitle = styled.p`
  all: unset;

  text-align: center;
  ${getTypography("heading3")}
`;

export const SlideSubTitle = styled.p`
  all: unset;

  text-align: center;
  ${getTypography("heading4")}
`;
