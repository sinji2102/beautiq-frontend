import * as S from "./ProductListItem.styled";

const ProductListItem = () => {
  return (
    <S.RecommendProductWrapper>
      <S.ProductImage src="https://avatars.githubusercontent.com/u/101495452?v=4" alt="Product" />
      <S.ProductInfo>
        <S.ProductText className="title">Sample Product Name</S.ProductText>
        <S.ProductText>Sample Product Name</S.ProductText>
        <S.ReviewText>⭐ 3.3 (리뷰 39)</S.ReviewText>
      </S.ProductInfo>
      <S.LikeButton>
        <S.HeartIcon />
      </S.LikeButton>
    </S.RecommendProductWrapper>
  );
};

export default ProductListItem;
