import { del, get, post } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { AxiosResponse } from "axios";

export type SkinAnalysisResponse = components["schemas"]["SkinAnalysisResponse"];

// 피부 분석 결과 조회 (POST)
export const postPerformance = async (imageFile: File): Promise<SkinAnalysisResponse | null> => {
  try {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response: AxiosResponse<SkinAnalysisResponse> = await post("/skin-analyses", formData);

    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// 피부 분석 결과 조회 (GET)
export const getSkinAnalysisResult = async (
  analysisId: string
): Promise<SkinAnalysisResponse | null> => {
  try {
    const response: AxiosResponse<SkinAnalysisResponse> = await get(`/skin-analyses/${analysisId}`);

    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// 피부 분석 결과 삭제 (DELETE)
export const deleteSkinAnalysis = async (analysisId: number): Promise<void | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<void>> = await del(
      `/skin-analyses/${analysisId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("deleteSkinAnalysis error", error);
    return null;
  }
};

export type YearlyDaySkinPointsResponse = components["schemas"]["YearlyDaySkinPointsResponse"];

// 연간 피부 트렌드 조회 (GET)
export const getSkinAnalysisTrendsYearly = async (
  year?: number // optional로 해도 괜찮습니다. 명세서에 required: false
): Promise<YearlyDaySkinPointsResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<YearlyDaySkinPointsResponse>> = await get(
      "/skin-analyses/trends/yearly",
      {
        params: {
          year,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export type SixtyDaySkinPointsResponse = components["schemas"]["SixtyDaySkinPointsResponse"];

// 60일 피부 트렌드 조회 (GET)
export const getSkinAnalysisTrends60Days = async (
  date: string
): Promise<SixtyDaySkinPointsResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SixtyDaySkinPointsResponse>> = await get(
      "/skin-analyses/trends/60days",
      {
        params: {
          date,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export type MonthlySkinStatusResponse = components["schemas"]["MonthlySkinStatusResponse"];

// 월별 피부 상태 조회 (GET)
export const getSkinAnalysisMonthly = async (
  year: number,
  month: number
): Promise<MonthlySkinStatusResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<MonthlySkinStatusResponse>> = await get(
      "/skin-analyses/monthly",
      {
        params: {
          year,
          month,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// 최신 피부 분석 결과 조회 (GET)
export const getSkinAnalysisLatest = async (): Promise<SkinAnalysisResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SkinAnalysisResponse>> =
      await get("/skin-analyses/latest");

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export type DailySkinDatesResponse = components["schemas"]["DailySkinDatesResponse"];

// 특정 일자의 분석 타임스탬프 조회 (GET)
export const getSkinAnalysisDaily = async (
  date: string
): Promise<DailySkinDatesResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<DailySkinDatesResponse>> = await get(
      "/skin-analyses/daily",
      {
        params: {
          date,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
