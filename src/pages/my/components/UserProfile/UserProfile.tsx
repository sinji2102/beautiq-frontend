import * as S from "./UserProfile.styled";

const tempData = { email: "user@example.com", username: "민우", provider: "kakao" };

const UserProfile = () => {
  return (
    <S.UserProfileWrapper>
      <S.ProfileImage
        src="https://avatars.githubusercontent.com/u/66528589?v=4"
        alt="프로필 이미지"
      />
      <S.UserInfo>
        <S.UserName>{tempData.username}</S.UserName>
        <S.Text>{tempData.email}</S.Text>
        {/* TODO : 가입일 백엔드에 요청 후 수정 */}
        <S.Text>가입일</S.Text>
      </S.UserInfo>
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
