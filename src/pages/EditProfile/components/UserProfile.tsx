import * as S from "./UserProfile.styled";

const tempData = {
  email: "user@example.com",
  username: "민우",
  provider: "kakao",
};

const UserProfile = () => {
  return (
    <S.ProfileWrapper>
      <S.ProfileImageContainer>
        <S.ProfileImage
          src="
          https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="프로필 이미지"
        />
        <S.ImageChangeButton>프로필 사진 변경</S.ImageChangeButton>
        <S.InfoTitle>기본 정보</S.InfoTitle>
        <S.UserInfo>
          <S.InfoText>사용자명</S.InfoText>
          {tempData.username}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>이메일</S.InfoText>
          {tempData.email}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>소셜 로그인 정보</S.InfoText>
          {/* TODO : 서버에서 enum으로 주는지 확인 필요 */}
          {/* TODO : 로고 추가 필요 */}
          {tempData.provider === "kakao" ? "카카오 로그인" : "구글 로그인"}
        </S.UserInfo>
      </S.ProfileImageContainer>
    </S.ProfileWrapper>
  );
};

export default UserProfile;
