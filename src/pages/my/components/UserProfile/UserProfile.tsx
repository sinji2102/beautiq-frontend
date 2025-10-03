import * as S from "./UserProfile.styled";

const UserProfile = () => {
  return (
    <S.UserProfileWrapper>
      <S.ProfileImage
        src="https://avatars.githubusercontent.com/u/66528589?v=4"
        alt="프로필 이미지"
      />
      <S.UserInfo>
        <S.UserName>이름</S.UserName>
        <S.Text>이메일</S.Text>
        <S.Text>가입일</S.Text>
      </S.UserInfo>
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
