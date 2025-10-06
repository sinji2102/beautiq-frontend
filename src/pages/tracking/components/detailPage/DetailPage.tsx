import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import * as S from "@pages/tracking/components/detailPage/DetailPage.styled";
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();

  return (
    <>
      <Header left="back" text={location.state.dateStr + " 분석결과"} />
      <S.FaceButton>
        <Button size="xsmall" variant = "line" children="왼쪽 눈가"/>
      </S.FaceButton>
    </>
  );
};

export default DetailPage;
