import { get } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { AxiosResponse } from "axios";

export type TodayTipResponse = components["schemas"]["TodayTipResponse"];

// 오늘의 뷰티 팁 조회 (GET)
export const getTodayTip = async (): Promise<TodayTipResponse | null> => {
  try {
    const response: AxiosResponse<TodayTipResponse> = await get("/today-tip");

    return response.data;
  } catch (error) {
    console.error("getTodayTip error", error);
    return null;
  }
};
