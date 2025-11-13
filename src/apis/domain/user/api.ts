import { get } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { AxiosResponse } from "axios";

export type UserResponse = components["schemas"]["UserResponse"];

export const getUserInfo = async (): Promise<UserResponse | null> => {
  try {
    const response: AxiosResponse<UserResponse> = await get(`/users/me`);

    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
