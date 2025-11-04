import { IconHeart } from "@assets/svgs";
import styled from "@emotion/styled";
import { getTypography } from "@styles/typography";

export const RecommendProductWrapper = styled.div`
  display: flex;
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
  ${getTypography("caption2Medi")};
`;

export const ProductText = styled.h3`
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
