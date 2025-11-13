import { del, get, post, put } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { AxiosResponse } from "axios";

// 내 정보 수정 (PUT)
export const putRecommendProducts = async (
  username: string,
  email: string
): Promise<void | null> => {
  try {
    const response: AxiosResponse<void> = await put("/users/edit", {
      params: {
        username,
        email,
      },
    });

    return response.data;
  } catch (error) {
    console.error("putRecommendProducts error:", error);
    return null;
  }
};

export type ProfileImageResponse = { success: boolean; message: string; imageUrl: string };

// 프로필 이미지 업로드 (POST)
export const postProfileImage = async (imageFile: File): Promise<ProfileImageResponse | null> => {
  try {
    const formData = new FormData();

    formData.append("file", imageFile);

    const response: AxiosResponse<ProfileImageResponse> = await post(
      "/users/profile-image",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("postProfileImage error", error);
    return null;
  }
};

// 로그아웃 (POST)
export const postLogout = async (): Promise<void | null> => {
  try {
    const response: AxiosResponse<void> = await post("/users/logout");

    return response.data;
  } catch (error) {
    console.error("postLogout error", error);
    return null;
  }
};

export type UserResponse = components["schemas"]["UserResponse"];

// 내 정보 조회 (GET)
export const getUserInfo = async (): Promise<UserResponse | null> => {
  try {
    const response: AxiosResponse<UserResponse> = await get(`/users/me`);
    const data = response.data;

    if (data.profileImage) {
      let imageUrl = data.profileImage;

      // profile/ 경로가 없으면 추가
      if (!imageUrl.includes("/profile/")) {
        const parts = imageUrl.split("/");
        const filename = parts.pop();
        imageUrl = [...parts, "profile", filename].join("/");
      }

      // .png 확장자가 없으면 추가
      if (!imageUrl.endsWith(".png")) {
        imageUrl += ".png";
      }

      data.profileImage = imageUrl;
    }

    return data;
  } catch (error) {
    console.error("getUserInfo error", error);
    return null;
  }
};

// 회원 탈퇴 (DELETE)
export const deleteUser = async (): Promise<void | null> => {
  try {
    const response: AxiosResponse<void> = await del("/users/me");

    return response.data;
  } catch (error) {
    console.error("deleteUser error", error);
    return null;
  }
};
