import Header from "@components/commons/header/Header";
import * as S from "@pages/tracking/components/detailPage/DetailPage.styled";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ButtonList = [
  "왼쪽 눈가",
  "오른쪽 눈가",
  "왼쪽 볼",
  "오른쪽 볼",
  "이마",
  "미간",
  "입술",
  "턱",
];
const ScoreList = ["건조", "색소침착", "모공", "처짐", "주름"];

const tempData = [
  {
    name: "lefteye",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "righteye",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "leftcheek",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "rightcheek",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "forehead",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "bte",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "lip",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
  {
    name: "chin",
    dryness: 100, // 건조 점수 (모두 0-100으로 출력)
    pigmentation: 100, // 색소침착 점수
    pore: 100, // 모공 점수
    sagging: 100, // 처짐 점수
    wrinkle: 100, // 주름 점수
  },
];

const DetailPage = () => {
  const location = useLocation();

  type SkinAnalysisScores = {
    dryness: number; // 건조 점수 (모두 0-100으로 출력)
    pigmentation: number; // 색소침착 점수
    pore: number; // 모공 점수
    sagging: number; // 처짐 점수
    wrinkle: number; // 주름 점수 x
  };

  const [clickBtn, setClickBtn] = useState("");

  const handleClick = (part: string) => {
    setClickBtn(part);
    console.log("버튼이 눌렸습니다.");
  };

  return (
    <>
      <Header left="back" text={location.state.dateStr + " 분석결과"} />

      <S.FaceButtonWrapper>
        {tempData.map((part) => (
          <S.FaceButton
            key={part}
            onClick={() => handleClick(part.name)}
            $isActive={clickBtn === part.name}
          >
            {part.name}
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
