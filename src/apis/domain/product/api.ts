import { get, patch, post } from "@apis/index";
import type { components } from "@custom-types/api/schema";
import type { ApiResponseType } from "@custom-types/commonType";
import type { AxiosResponse } from "axios";

export type RecommendProductRequest = components["schemas"]["ProductRequest"];
export type RecommendProductResponse = components["schemas"]["ProductResponse"];

/**
 * 피부 분석 결과 기반 제품 추천 API
 * POST /skin-analyses/{analysisId}/recommend-products
 */
export const postRecommendProducts = async (
  analysisId: string,
  data: RecommendProductRequest
): Promise<RecommendProductResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<RecommendProductResponse>> = await post(
      `/skin-analyses/${analysisId}/recommend-products`,
      data
    );

    return response.data.data;
  } catch (error) {
    console.error(" postRecommendProducts error:", error);
    return null;
  }
};

export type WishlistToggleResponse = components["schemas"]["WishlistToggleResponse"];

/**
 * 위시리스트 토글 (추가/삭제 통합)
 * PATH /products/{productId}/wishlists
 * @param productId - 제품 ID
 */
export const patchWishlistToggle = async (
  productId: string
): Promise<WishlistToggleResponse | null> => {
  try {
    const res: AxiosResponse<ApiResponseType<WishlistToggleResponse>> = await patch(
      `/products/${productId}/wishlists`
    );
    return res.data.data;
  } catch (e) {
    console.error("patchWishlistToggle error:", e);
    return null;
  }
};

export type WishlistProductsResponse = components["schemas"]["Page"];

/**
 * 사용자의 위시리스트에 담긴 제품 전체 조회
 * GET /users/me/wishlists/products
 * @param order - 정렬 기준 ("rate" | "popular" | "newest")
 * @param page - 페이지 번호 (기본 1)
 */
export const getWishlistProducts = async (
  order: "rate" | "popular" | "newest" = "newest",
  page: number = 1
): Promise<WishlistProductsResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<WishlistProductsResponse>> = await get(
      "/users/me/wishlists/products",
      {
        params: {
          order,
          page,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(" getWishlistProducts error:", error);
    return null;
  }
};

export type WishlistProductDetailResponse = components["schemas"]["WishProductResponse"];

/**
 * 사용자의 위시리스트에 담긴 특정 제품 조회
 * GET /users/me/wishlists/products/{productId}
 * @param productId - 제품 ID
 */
export const getWishlistProductDetail = async (
  productId: string
): Promise<WishlistProductDetailResponse | null> => {
  try {
    const res: AxiosResponse<ApiResponseType<WishlistProductDetailResponse>> = await get(
      `/users/me/wishlists/products/${productId}`
    );
    return res.data.data;
  } catch (e) {
    console.error("getWishlistProductDetail error:", e);
    return null;
  }
};
