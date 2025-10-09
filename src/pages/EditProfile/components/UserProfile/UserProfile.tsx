import { useRef, useState } from "react";

import * as S from "./UserProfile.styled";

const tempData = {
  email: "user@example.com",
  username: "민우",
  provider: "kakao",
};

const UserProfile = () => {
  const [username, setUsername] = useState(tempData.username);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      // TODO : 현재 임시 처리 -> 이미지 없을 때 처리 필요
      alert("변경할 이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    // TODO : 실제 API 명세에 맞게 변경 필요
    formData.append("sourceImage", imageFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // TODO : username API 연결 필요

    alert("저장 완료");
  };

  return (
    <S.ProfileWrapper>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <S.ProfileImageContainer>
        <S.ProfileImage src={previewUrl || defaultImageUrl} alt="프로필 이미지" />
        <S.ImageChangeButton type="button" onClick={handleImageChangeClick}>
          프로필 사진 변경
        </S.ImageChangeButton>
        <S.InfoTitle>기본 정보</S.InfoTitle>
        <S.UserInfo>
          <S.InfoText>사용자명</S.InfoText>
          <S.InfoInput value={username} onChange={(e) => setUsername(e.target.value)} />
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>이메일</S.InfoText>
          {tempData.email}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>소셜 로그인 정보</S.InfoText>
          {tempData.provider === "kakao" ? "카카오 로그인" : "구글 로그인"}
        </S.UserInfo>
      </S.ProfileImageContainer>
      <S.SaveButton onClick={handleSubmit}>저장하기</S.SaveButton>
    </S.ProfileWrapper>
  );
};

export default UserProfile;
