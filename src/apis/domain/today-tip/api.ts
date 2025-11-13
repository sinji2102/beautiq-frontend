import { get } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { AxiosResponse } from "axios";

export type TodayTipResponse = components["schemas"]["TodayTipResponse"];

export const getUserInfo = async (): Promise<TodayTipResponse | null> => {
  try {
    const response: AxiosResponse<TodayTipResponse> = await get("/today-tip");

    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
