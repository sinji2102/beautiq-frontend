import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const CarouselWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 2.4rem;

  .swiper-pagination-bullet {
    width: 0.6rem;
    height: 0.6rem;

    background: rgb(0 0 0 / 20%);
    opacity: 1;
    border-radius: 50%;

    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 2rem;

    background: ${({ theme }) => theme.colors.primary[100]};
    border-radius: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.white};
  border: solid 0.1rem rgb(0 0 0 / 10%);
  border-radius: 0.6rem;
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;

  background-color: ${({ theme }) => theme.colors.neutral[100]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoBox = styled.div`
  padding: 0.8rem;
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
`;

export const Keyword = styled.span`
  flex-shrink: 0;
  padding: 0.2rem 0.8rem;

  ${getTypography("caption2Medi")};

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 0.4rem;
`;

export const Title = styled.div`
  display: flex;
  ${getTypography("body1NormalSemi")};
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PaginationStyle = styled.div``;
