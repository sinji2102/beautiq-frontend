import Header from "@components/commons/header/Header";
import ProductListItem from "@components/commons/productListItem/ProductListItem";
import { useParams } from "react-router-dom";

import * as S from "./RecommendProduce.styled";

// TODO : 명세 제대로 나왔는지 확인하기

// const tempData = {
// 	"products": [
// 	  {
// 			"product": {
// 				"id": 1,
// 				"category": string,
// 				"overallRank": integer,
// 				"pageNumber": integer,
// 				"pageRank": integer,
// 				"brand": string,
// 				"productName": string,
// 				"listPrice": integer,
// 				"salePrice": integer,
// 				"reviewScore": float,
// 				"reviewCount": integer,
// 				"ingredients": string,
// 				"description": string,
// 				"tags": string,
// 				"bestOrNew": string,
// 				"imageUrl": string,
// 				"productUrl": string
// 			},
// 	    "reason": "임시 이유"      // LLM이 생성한 개인화 추천 이유
// 	  },
// 	  ...
// 	]
// }

const RecommendProductPage = () => {
  const params = useParams(); // api 요청용 params -> params.analysisId 사용

  return (
    <>
      <Header left="back" text="제품 추천" />
      <S.RecommendProductWrapper>
        <ProductListItem />
      </S.RecommendProductWrapper>
    </>
  );
};

export default RecommendProductPage;
