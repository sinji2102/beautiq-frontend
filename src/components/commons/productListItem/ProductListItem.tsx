import type { WishlistProductsResponse } from "@apis/domain/product/api";
import { patchWishlistToggle } from "@apis/domain/product/api";
import { useState } from "react";

import * as S from "./ProductListItem.styled";

interface ListItemProps {
  product: WishlistProductsResponse["products"][0]["product"];
  reason: string;
  isWish: boolean;
}

const ProductListItem = ({ product, reason, isWish }: ListItemProps) => {
  const [liked, setLiked] = useState(isWish); // TODO : API 수정되면 기본값이 API에서 넘어온 boolean으로 수정

  const handleLikeClick = () => {
    setLiked((prev) => !prev);
    patchWishlistToggle(product.id);
  };

  return (
    <S.RecommendProductWrapper>
      <S.RecommendProductContainer>
        <S.ProductImage src={product?.imageUrl} alt="Product" />
        <S.ProductInfo>
          <S.ProductText className="title">{product?.productName}</S.ProductText>
          <S.ProductText>{product?.salePrice}원</S.ProductText>
          <S.ReviewText>
            ⭐ {product?.reviewScore} (리뷰 {product?.reviewCount})
          </S.ReviewText>
        </S.ProductInfo>
        <S.LikeButton onClick={handleLikeClick}>
          <S.HeartIcon $liked={liked} />
        </S.LikeButton>
      </S.RecommendProductContainer>
      <S.RecommendReason>
        <S.WandIcon />
        <S.ReasonText>AI 추천 코멘트: {reason}</S.ReasonText>
      </S.RecommendReason>
    </S.RecommendProductWrapper>
  );
};

export default ProductListItem;
