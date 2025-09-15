import * as S from "./CardContainer.styled";

const CardContainer = () => {
  return (
    <S.CardContainer>
      <S.Card variant="skin">피부 분석</S.Card>
      <S.Card variant="makeup">메이크업 추천</S.Card>
    </S.CardContainer>
  );
};

export default CardContainer;
