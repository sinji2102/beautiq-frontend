import { useRef, useState } from "react";

import * as S from "./UserProfile.styled";

const tempData = {
  email: "user@example.com",
  username: "민우",
  provider: "kakao",
};

const UserProfile = () => {
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
      alert("변경할 이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    // TODO : 실제 API 명세에 맞게 변경 필요
    formData.append("sourceImage", imageFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

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
          {tempData.username}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>이메일</S.InfoText>
          {tempData.email}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>소셜 로그인 정보</S.InfoText>
          {tempData.provider === "kakao" ? "카카오 로그인" : "구글 로그인"}
        </S.UserInfo>

        {/* TODO : 변경사항 제출용 임시 버튼 - 디자인 수정 필요 */}
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          저장하기
        </button>
      </S.ProfileImageContainer>
    </S.ProfileWrapper>
  );
};

export default UserProfile;
