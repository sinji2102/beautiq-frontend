import * as S from "./TodayTip.styled";

const tempText =
  "건조한 피부 어쩌고저쩌고 아오 디자인 어쩌고 저쩌고 최대 몇 글자까지 가능한지 백엔드랑 얘기해보기 줄줄줄줄줄줄줄 건조한 피부 어쩌고저쩌고 아오 디자인 어쩌고 저쩌고 최대 몇 글자까지 가능한지 백엔드랑 얘기해보기 줄줄줄줄줄줄줄건조한 피부 어쩌고저쩌고 아오 디자인 어쩌고 저쩌고 최대 몇 글자까지 가능한지 백엔드랑 얘기해보기 줄줄줄줄줄줄줄건조한 피부 어쩌고저쩌고 아오 디자인 어쩌고 저쩌고 최대 몇 글자까지 가능한지 백엔드랑 얘기해보기 줄줄줄줄줄줄줄건조한 피부 어쩌고저쩌고 아오 디자인 어쩌고 저쩌고 최대 몇 글자까지 가능한지 백엔드랑 얘기해보기";

const TodayTip = () => {
  return (
    <S.TipContainer>
      <S.Title>
        <S.GrowingHeartIcon />
        오늘의 뷰티 팁
      </S.Title>
      {tempText}
    </S.TipContainer>
  );
};

export default TodayTip;
