import { post } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { ApiResponseType } from "@custom-types/commonType";
import type { AxiosResponse } from "axios";

export type MakeupSimulationResponse = components["schemas"]["ImageItem"];  // 동일

/**
 * 1) 시뮬레이션: 원본/참조 이미지 업로드 → S3 URL 반환
 * POST /makeup/simulation
 * form-data: styleImage (file)
 * response: { imageName, imageUrl }
 */
export const postMakeupSimulation = async (
  styleImageFile: File
): Promise<MakeupSimulationResponse | null> => {
  try {
    const formData = new FormData();
    formData.append("styleImage", styleImageFile);

    const response: AxiosResponse<ApiResponseType<MakeupSimulationResponse>> = await post(
      "/makeup/simulation",
      formData
    );
    return response.data.data;
  } catch (error) {
    console.error("postMakeupSimulation error", error);
    return null;
  }
};

export type MakeupRecommendationRequest = components["schemas"]["RecommendRequestDto"];
export type MakeupRecommendationResponse = components["schemas"]["RecommendResponseDto"];

/**
 * 2) 추천: (스웨거 캡처엔 없지만 기존 코드 유지 시) 이미지 + 데이터 동시 전송일 수도 있음
 * 만약 백엔드가 실제로는 simulation만 파일을 받고,
 * recommendation은 imageName + data(JSON)만 받는 구조라면 이 함수는 삭제/수정하세요.
 */
export const postMakeupRecommendation = async (
  imageFile: File,
  data: MakeupRecommendationRequest
): Promise<MakeupRecommendationResponse | null> => {
  try {
    const formData = new FormData();
    formData.append("Image", imageFile);
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    const response: AxiosResponse<ApiResponseType<MakeupRecommendationResponse>> = await post(
      "/makeup/recommendation",
      formData
    );
    return response.data.data;
  } catch (error) {
    console.error("postMakeupRecommendation error", error);
    return null;
  }
};

/**
 * 3) 저장: 시뮬/커스터마이징 결과 이미지를 S3에 영구 저장 + DB 기록
 * POST /makeup/save
 * form-data: imageName (string), data (object: 키워드 등)  ← 파일 X
 * response: 201 (보통 본문 없음)
 */
export const postMakeupSave = async (
  imageName: string,
  data: MakeupRecommendationRequest // 키워드 등 메타데이터 DTO가 이것이라면 재사용
): Promise<void | null> => {
  try {
    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    const response: AxiosResponse<ApiResponseType<void>> = await post("/makeup/save", formData);
    return response.data.data; // 아마 undefined일 것
  } catch (error) {
    console.error("postMakeupSave error", error);
    return null;
  }
};

export type MakeupCustomizeRequest = components["schemas"]["CustomizeRequestDto"];
export type MakeupCustomizeResponse = components["schemas"]["CustomizeResponseDto"];

/**
 * 4) 커스텀: 시뮬 결과 이미지에 색상/강도 등 커스터마이징 적용
 * POST /makeup/customize
 * form-data: imageName (string), data (CustomizeRequestDto)  ← 파일 X
 * response: CustomizeResponseDto { status, imageName, imageUrl, message }
 */
export const postCustomize = async (
  imageName: string,
  data: MakeupCustomizeRequest
): Promise<MakeupCustomizeResponse | null> => {
  try {
    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    const response: AxiosResponse<ApiResponseType<MakeupCustomizeResponse>> = await post(
      "/makeup/customize",
      formData
    );
    return response.data.data;
  } catch (error) {
    console.error("postCustomize error", error);
    return null;
  }
};
