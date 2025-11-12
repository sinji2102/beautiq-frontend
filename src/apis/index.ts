import axios from "axios";

// --- 개발 환경 임시 쿠키 설정 로직 ---
// 이 코드는 이 파일이 애플리케이션에서 처음 import될 때 1회 실행됩니다.
if (import.meta.env.MODE === "development") {
  console.log("DEV MODE: 임시 쿠키를 설정합니다.");

  const TEMP_COOKIE_NAME = "Authorization";
  const TEMP_COOKIE_VALUE = import.meta.env.VITE_TEMP_AUTHORIZATION;
  const DAYS_TO_EXPIRE = 1;

  let expires = "";
  if (DAYS_TO_EXPIRE) {
    const date = new Date();
    date.setTime(date.getTime() + DAYS_TO_EXPIRE * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  // ⚠️ 'Secure' 속성 주의
  // 'Secure' 속성이 있으면 이 쿠키는 https:// 에서만 전송됩니다.
  // 만약 http://localhost 에서 테스트 중이라면 'Secure' 속성을 빼야 합니다.

  // 1. HTTPS (e.g., https://localhost)에서 테스트 시
  document.cookie = TEMP_COOKIE_NAME + "=" + TEMP_COOKIE_VALUE + expires + "; path=/; Secure";

  // 2. HTTP (e.g., http://localhost)에서 테스트 시 (위 라인을 주석 처리하고 아래 라인 사용)
  // document.cookie = TEMP_COOKIE_NAME + "=" + TEMP_COOKIE_VALUE + expires + "; path=/";

  console.log(`임시 쿠키 설정 완료: ${TEMP_COOKIE_NAME}`);
}

const getAccessTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const tokenCookie = cookies.find((c) => c.startsWith("Authorization="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getAccessTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// --- --------------------------------- ---

// --- 프로덕션용 코드 ---
// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// instance.interceptors.request.use((config) => {
//   return config;
// });

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T>(...args);
}
