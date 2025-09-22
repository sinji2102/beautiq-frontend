import { useNavigate } from "react-router-dom";

import * as S from "./CardContainer.styled";

const CardContainer = () => {
  const navigate = useNavigate();

  return (
    <S.CardContainer>
      {/* TODO : 이동 url 확인해서 수정 */}
      <S.Card variant="skin" onClick={() => navigate("/skin")}>
        <S.LotionBottleIcon />
        피부 분석
        <S.CardSubText>{`얼굴 사진으로 피부를 \n분석할 수 있어요`}</S.CardSubText>
      </S.Card>
      {/* TODO : 이동 url 확인해서 수정 */}
      <S.Card variant="makeup" onClick={() => navigate("/makeup")}>
        <S.LipstickIcon />
        메이크업 추천
        <S.CardSubText>{`나에게 맞는\n스타일 찾기`}</S.CardSubText>
      </S.Card>
    </S.CardContainer>
  );
};

export default CardContainer;
