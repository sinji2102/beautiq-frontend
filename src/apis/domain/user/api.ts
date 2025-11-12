import { del, get, post, put } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { ApiResponseType } from "@custom-types/commonType";
import type { AxiosResponse } from "axios";

// 내 정보 수정 (PUT)
export const putRecommendProducts = async (
  username: string,
  email: string
): Promise<void | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<void>> = await put("/users/edit", {
      params: {
        username,
        email,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("postRecommendProducts error:", error);
    return null;
  }
};

export type ProfileImageResponse = { success: boolean; message: string; imageUrl: string };

// 프로필 이미지 업로드 (POST)
export const postProfileImage = async (imageFile: File): Promise<ProfileImageResponse | null> => {
  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response: AxiosResponse<ApiResponseType<ProfileImageResponse>> = await post(
      "/users/profile-image",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.error("postProfileImage error", error);
    return null;
  }
};

// 로그아웃 (POST)
export const postLogout = async (): Promise<void | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<void>> = await post("/users/logout");

    return response.data.data;
  } catch (error) {
    console.error("postLogout error", error);
    return null;
  }
};

export type UserResponse = components["schemas"]["UserResponse"];

// 내 정보 조회 (GET)
export const getUserInfo = async (): Promise<UserResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<UserResponse>> = await get(`/users/me`);

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// 회원 탈퇴 (DELETE)
export const deleteUser = async (): Promise<void | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<void>> = await del("/users/me");

    return response.data.data;
  } catch (error) {
    console.error("deleteUser error", error);
    return null;
  }
};
