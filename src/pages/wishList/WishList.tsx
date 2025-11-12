import Header from "@components/commons/header/Header";
import ProductListItem from "@components/commons/productListItem/ProductListItem";

// import { useParams } from "react-router-dom";
import { ProductList } from "../../mockData";
import * as S from "./WishList.styled";

const WishListPage = () => {
  // const params = useParams(); // api 요청용 params -> params.analysisId 사용

  return (
    <>
      <Header left="back" text="내가 찜한 제품" />
      <S.WishListPageWrapper>
        {/* TODO : 정렬 UI 퍼블리싱 및 API 연결 */}
        {ProductList.map((item) => (
          <ProductListItem
            key={item.productId}
            product={item}
            reason="임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 임시용 텍스트 "
          />
        ))}
      </S.WishListPageWrapper>
    </>
  );
};

export default WishListPage;
