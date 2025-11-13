import { useEffect, useState } from "react";

import * as S from "./UserProfile.styled";

const UserProfile = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [createDate, setCreateDate] = useState<string | null>(null);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setPreviewUrl(parsed.profileImage);
        setUserName(parsed.username || "사용자");
        setUserEmail(parsed.email);
        setCreateDate(parsed.createdAt);
      } catch (error) {
        console.error("Failed to parse user data", error);
        setPreviewUrl(null);
        setUserName(null);
        setUserEmail(null);
        setCreateDate(null);
      }
    } else {
      setPreviewUrl(null);
      setUserName(null);
      setUserEmail(null);
      setCreateDate(null);
    }
  }, []);

  return (
    <S.UserProfileWrapper>
      <S.ProfileImage src={previewUrl || defaultImageUrl} alt="프로필 이미지" />
      <S.UserInfo>
        <S.UserName>{userName}</S.UserName>
        <S.Text>{userEmail}</S.Text>
        <S.Text>가입일 {createDate?.split("T")[0]}</S.Text>
      </S.UserInfo>
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
