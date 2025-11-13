import { getUserInfo, postProfileImage, putRecommendProducts } from "@apis/domain/user/api";
import { useEffect, useRef, useState } from "react";

import * as S from "./UserProfile.styled";

const tempData = {
  email: "user@example.com",
  username: "민우",
  provider: "kakao", // "kakao" | "google" (서버에서 요청 어떻게 오는지 확인 필요)
};

const UserProfile = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setPreviewUrl(parsed.profileImage);
        setUserName(parsed.username || "사용자");
        setUserEmail(parsed.email);
      } catch (error) {
        console.error("Failed to parse user data", error);
        setPreviewUrl(null);
        setUserName("사용자");
        setUserEmail(null);
      }
    } else {
      setPreviewUrl(null);
      setUserName("사용자");
      setUserEmail(null);
    }
  }, []);

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
    try {
      // username, email 등 필요한 값이 있다고 가정
      if (!userName || !userEmail) {
        alert("이름과 이메일을 입력해주세요.");
        return;
      }

      if (imageFile) {
        const imageResponse = await postProfileImage(imageFile);

        if (!imageResponse?.success) {
          alert("이미지 업로드에 실패했습니다.");
          return;
        }

        console.log("업로드된 이미지 URL:", imageResponse.imageUrl);
      }

      const result = await putRecommendProducts(userName, userEmail);

      // 완료되면 유저 정보 다시 받아오기

      if (result === null) {
        alert("내 정보 수정에 실패했습니다.");
        return;
      }

      const fetchAndStoreUser = async () => {
        try {
          const userInfo = await getUserInfo();

          if (userInfo) {
            // 유저 정보가 성공적으로 받아와졌다면 localStorage에 저장
            localStorage.setItem("user", JSON.stringify(userInfo));
          } else {
            // 유저 정보를 받아오지 못했다면 로그인 페이지 등으로 리디렉션
            console.error("유저 정보를 가져오는데 실패했습니다.");
          }
        } catch (error) {
          // API 호출 중 예외 발생 시 처리
          console.error("API 호출 중 오류 발생:", error);
        }
      };

      fetchAndStoreUser();
    } catch (error) {
      console.error("handleSubmit error:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
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
          <S.InfoInput value={userName} onChange={(e) => setUserName(e.target.value)} />
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>이메일</S.InfoText>
          {userEmail}
        </S.UserInfo>
        <S.UserInfo>
          <S.InfoText>소셜 로그인 정보</S.InfoText>

          {tempData.provider === "kakao" ? (
            <S.LoginInfo>
              카카오 로그인 <S.KakaoIcon />
            </S.LoginInfo>
          ) : (
            <S.LoginInfo>
              구글 로그인 <S.GoogleIcon />
            </S.LoginInfo>
          )}
        </S.UserInfo>
      </S.ProfileImageContainer>
      <S.SaveButton onClick={handleSubmit}>저장하기</S.SaveButton>
    </S.ProfileWrapper>
  );
};

export default UserProfile;
