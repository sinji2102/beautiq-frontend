import OnboardingCarousel from "./components/OnboardingCarousel/OnboardingCarousel";
import * as S from "./Login.styled";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <S.LoginWrapper>
      <OnboardingCarousel />
      <S.LoginButtonContainer>
        <S.GoogleButton onClick={handleGoogleLogin}>
          <img src="/src/assets/icons/google.svg" alt="Google" />
          Google 계정으로 로그인
        </S.GoogleButton>

        <S.KakaoButton onClick={handleKakaoLogin}>
          <img src="/src/assets/icons/kakao.svg" alt="Kakao" />
          카카오로 로그인
        </S.KakaoButton>
      </S.LoginButtonContainer>
    </S.LoginWrapper>
  );
};

export default LoginPage;
