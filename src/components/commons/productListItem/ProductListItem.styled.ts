import { IconHeart } from "@assets/svgs";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const RecommendProductWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 2.4rem;
`;

export const ProductImage = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  object-fit: cover;

  border-radius: 1rem;

  fill: ${({ theme }) => theme.colors.gray[400]};
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: start;
  width: 100%;
  ${getTypography("caption2Medi")};
`;

export const ProductText = styled.h3`
  align-content: start;
  width: 20rem;

  &.title {
    display: -webkit-box;
    min-height: calc(1.6rem * 2);
    overflow: hidden;

    line-height: 1.6rem;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: keep-all;

    /* 최대 2줄 */
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  all: unset;
`;

export const ReviewText = styled.span`
  color: ${({ theme }) => theme.colors.gray[600]};
`;

export const HeartIcon = styled(IconHeart)`
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
`;

export const LikeButton = styled.button`
  all: unset;

  display: flex;
`;
