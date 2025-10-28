import { useState } from "react";
import Header from "@components/commons/header/Header";
import * as S from "@pages/tracking/components/detailPage/DetailPage.styled";
import { useLocation } from 'react-router-dom';

const ButtonList = ['왼쪽 눈가', '오른쪽 눈가', '왼쪽 볼', '오른쪽 볼', '이마', '미간', '입술', '턱']
const ScoreList = ['건조', '색소침착', '모공', '처짐', '주름']

const DetailPage = () => {
  const location = useLocation();

  const [clickBtn, setClickBtn] = useState("")

  const handleClick = (part : string) => {
    setClickBtn(part);
    console.log("버튼이 눌렸습니다.");
  };

  return (
    <>
      <Header left="back" text={location.state.dateStr + " 분석결과"} />

      <S.FaceButtonWrapper>
        {ButtonList.map((part) => (
          <S.FaceButton key={part} onClick={() => handleClick(part)} $isActive={clickBtn === part}>
            {part}
          </S.FaceButton>
        ))}
      </S.FaceButtonWrapper>
      <S.FaceTitle>{clickBtn}</S.FaceTitle>


      <S.ScoreBoardWrapper>
        {ScoreList.map((part) => (
          <S.ScoreBoardContainer>
            <S.ScoreBoardLeft> {part} </S.ScoreBoardLeft>
            <S.ScoreBoardRight> 
              <S.ScoreBoardRightTop>양호</S.ScoreBoardRightTop>
              <S.ScoreBoardRightBottom>100/100</S.ScoreBoardRightBottom>
            </S.ScoreBoardRight>
          </S.ScoreBoardContainer>
        ))}
      </S.ScoreBoardWrapper>

      

    </>
  );
};

export default DetailPage;
