import { getUserInfo } from "@apis/domain/user/api";
import { useEffect } from "react";

const CallbackPage = () => {
  useEffect(() => {
    const fetchAndStoreUser = async () => {
      try {
        const userInfo = await getUserInfo();

        if (userInfo) {
          // 유저 정보가 성공적으로 받아와졌다면 localStorage에 저장
          localStorage.setItem("user", JSON.stringify(userInfo));

          // 정보 저장 후 메인 페이지('/')로 리디렉션
          window.location.href = "/home";
        } else {
          // 유저 정보를 받아오지 못했다면 로그인 페이지 등으로 리디렉션
          console.log(userInfo);
          console.error("유저 정보를 가져오는데 실패했습니다.");
          window.location.href = "/login";
        }
      } catch (error) {
        // API 호출 중 예외 발생 시 처리
        console.error("API 호출 중 오류 발생:", error);
        window.location.href = "/login";
      }
    };

    fetchAndStoreUser();
  }, []);

  return <div>redirecting...</div>;
};

export default CallbackPage;
