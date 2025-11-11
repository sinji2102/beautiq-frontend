import OnboardingCarousel from "./components/OnboardingCarousel/OnboardingCarousel";
import * as S from "./Login.styled";

const LoginPage = () => {
  return (
    <S.LoginWrapper>
      <OnboardingCarousel />
    </S.LoginWrapper>
  );
};

export default LoginPage;
