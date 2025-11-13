import { getWishlistProducts } from "@apis/domain/product/api";
import Header from "@components/commons/header/Header";
import ProductListItem from "@components/commons/productListItem/ProductListItem";
import type { ProductContentItem } from "@custom-types/api/wishlist";
import { useEffect, useState } from "react";

import * as S from "./WishList.styled";

const WishListPage = () => {
  const [productList, setProductList] = useState<ProductContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const response = await getWishlistProducts("newest", 1);

        if (response && response.content) {
          setProductList(response.content);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error(error);
        setProductList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header left="back" text="내가 찜한 제품" />
        <S.WishListPageWrapper>
          <p>로딩 중...</p>
        </S.WishListPageWrapper>
      </>
    );
  }

  if (productList.length === 0) {
    return (
      <>
        <Header left="back" text="내가 찜한 제품" />
        <S.WishListPageWrapper>
          <p>찜한 제품이 없습니다.</p>
        </S.WishListPageWrapper>
      </>
    );
  }

  return (
    <>
      <Header left="back" text="내가 찜한 제품" />
      <S.WishListPageWrapper>
        {productList.map((item) => (
          <ProductListItem key={item.product.id} product={item.product} isWish={true} />
        ))}
      </S.WishListPageWrapper>
    </>
  );
};

export default WishListPage;
