import Header from "@components/commons/header/Header";
import ProductListItem from "@components/commons/productListItem/ProductListItem";

// import { useParams } from "react-router-dom";
import { ProductList } from "../../mockData";
import * as S from "./RecommendProduce.styled";

const RecommendProductPage = () => {
  // const params = useParams(); // api 요청용 params -> params.analysisId 사용

  return (
    <>
      <Header left="back" text="제품 추천" />
      <S.RecommendProductWrapper>
        {/* TODO : 정렬 UI 퍼블리싱 및 API 연결 */}
        {ProductList.map((item) => (
          <ProductListItem
            key={item.productId}
            product={item}
            reason="임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 "
          />
        ))}
      </S.RecommendProductWrapper>
    </>
  );
};

export default RecommendProductPage;
