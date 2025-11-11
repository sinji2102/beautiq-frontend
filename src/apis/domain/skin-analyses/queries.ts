import { getSkinAnalysisResult } from "@apis/domain/skin-analyses/api";
import { useQuery } from "@tanstack/react-query";

export const SKIN_ANALYSIS_QUERY_KEY = {
  DETAIL: "skinAnalysisDetail",
};

/**
 * 피부 분석 결과 조회(GET)를 위한 커스텀 훅
 * @param analysisId - 조회할 분석 ID
 */
export const useSkinAnalysisResult = (analysisId: string) => {
  return useQuery({
    queryKey: [SKIN_ANALYSIS_QUERY_KEY.DETAIL, analysisId],
    queryFn: () => getSkinAnalysisResult(analysisId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: !!analysisId,
  });
};
