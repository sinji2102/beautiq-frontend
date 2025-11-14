import type { RecommendProductRequest, RecommendProductResponse } from "@apis/domain/product/api";
import { postRecommendProducts } from "@apis/domain/product/api";
import Header from "@components/commons/header/Header";
import Loading from "@components/commons/loading/Loading";
import ProductListItem from "@components/commons/productListItem/ProductListItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./RecommendProduce.styled";

const RecommendProductPage: React.FC = () => {
  // ✅ 응답 타입 맞게 선언
  const [products, setProducts] = useState<RecommendProductResponse["products"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!params.analysisId) {
        setError("분석 ID가 없습니다.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const body: RecommendProductRequest = {
          topN: 10,
          filters: {
            price: { min: 0, max: 999999 },
          },
          sort: {
            by: "reviewScore",
            order: "desc",
          },
        };

        const res = await postRecommendProducts(params.analysisId, body);
        if (!res) {
          setError("추천 데이터를 불러오지 못했습니다.");
          return;
        }

        setProducts(res.products ?? []);
      } catch (e) {
        console.error(e);
        setError("서버 통신 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, [params.analysisId]);

  return (
    <>
      <Header left="back" text="제품 추천" />
      <S.RecommendProductWrapper>
        {loading && <Loading />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && products.length === 0 && <p>추천된 제품이 없습니다.</p>}

        {!loading &&
          !error &&
          products.map((item) => (
            <ProductListItem
              key={item.product.id}
              product={item.product}
              reason={item.reason ?? "피부 타입에 적합한 추천 제품이에요!"}
              isWish={item.isWish}
            />
          ))}
      </S.RecommendProductWrapper>
    </>
  );
};

export default RecommendProductPage;
