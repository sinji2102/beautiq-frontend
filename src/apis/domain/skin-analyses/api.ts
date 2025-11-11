import { post } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { ApiResponseType } from "@custom-types/commonType";
import type { AxiosResponse } from "axios";

export type SkinAnalysisResponse = components["schemas"]["SkinAnalysisResponse"];

// 피부 분석 결과 조회
export const postPerformance = async (imageFile: File): Promise<SkinAnalysisResponse | null> => {
  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response: AxiosResponse<ApiResponseType<SkinAnalysisResponse>> = await post(
      "/skin-analyses",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
