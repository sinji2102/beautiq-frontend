import type {
  MakeupCustomizeRequest,
  MakeupCustomizeResponse,
  MakeupRecommendationRequest,
} from "@apis/domain/makeup/api";
import {
  postCustomize,
  postMakeupSave,
} from "@apis/domain/makeup/api";
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./StyleResultPage.styled";

type NavState = {
  /** 커스터마이징 전 이미지(= 최초 생성본) */
  originalUrl?: string | null;
  /** 커스터마이징 적용 결과 이미지 */
  editedUrl?: string | null;
  /** 시뮬레이션 결과 이미지 이름 (커스터마이징/저장 시 필요) */
  imageName?: string | null;
  /** 키워드/사용자 입력 DTO (저장 API에 사용) */
  recommendData?: MakeupRecommendationRequest | null;
};

const asDataUrl = (b64: string | undefined | null) =>
  b64 ? `data:image/png;base64,${b64}` : null;

const StyleResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  // 결과/원본 이미지 URL
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [recommendData, setRecommendData] =
    useState<MakeupRecommendationRequest | null>(null);
  const [loading, setLoading] = useState(false);

  // 길게 눌러 원본 잠깐 보기
  const [peekOriginal, setPeekOriginal] = useState(false);

  // 최초/복귀 진입 시 NavState 반영 (의존성은 개별 필드로 명시)
  useEffect(() => {
    if (navState.originalUrl) setOriginalUrl(navState.originalUrl);
    if (navState.editedUrl ?? undefined) setEditedUrl(navState.editedUrl || null);
    if (navState.imageName) setImageName(navState.imageName);
    if (navState.recommendData) setRecommendData(navState.recommendData);
  }, [
    navState.originalUrl,
    navState.editedUrl,
    navState.imageName,
    navState.recommendData,
  ]);

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [originalUrl, editedUrl]);

  // 표시용 URL: (원본 미리보기 중이면 원본) 아니면 (편집본 또는 원본)
  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);

  /** ✅ 커스터마이징 요청 (/makeup/customize)
   *  CustomizeRequestDto의 구조에 맞게 data를 만들어야 함.
   *  에러 스크린샷상 타입은 대략:
   *    { base_image_base64: string; edits: { region?: string; intensity?: number; ... } }
   *  백엔드가 imageName으로 원본을 식별한다면 base_image_base64가 선택일 수도 있으므로
   *  최소한 edits만 채워 전송하고, 타입은 DTO에 맞춰 캐스팅한다.
   */
  const goCustomize = async () => {
    if (!imageName) {
      alert("이미지 이름이 없습니다. 시뮬레이션부터 다시 진행해주세요.");
      return;
    }

    try {
      setLoading(true);

      // ✅ 실제 스키마에 맞게 필드 보정 필요 (여기서는 edits만 사용)
      const customizeData = {
        edits: {
          region: "lip",
          intensity: 50,
        },
      } as unknown as MakeupCustomizeRequest;

      const res = await postCustomize(imageName, customizeData);

      if (!res) {
        alert("커스터마이징에 실패했습니다.");
        return;
      }

      // ✅ CustomizeResponseDto는 imageUrl/imageName이 아니라 base64를 반환하는 타입(스크린샷 기준)
      //    예: { status?: string; result_image_base64?: string; message?: string; }
      const typed: MakeupCustomizeResponse = res;

      const nextUrl = asDataUrl(typed.imageUrl);
      if (nextUrl) setEditedUrl(nextUrl);

      // 일부 백엔드는 커스터마이징 결과 imageName을 갱신하지 않을 수 있음
      // setImageName(typed.imageName ?? imageName);

      alert("커스터마이징이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("커스터마이징 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ 저장하기 (/makeup/save): imageName + recommendData(JSON) */
  const saveToList = async () => {
    if (!imageName || !recommendData) {
      alert("저장할 데이터가 없습니다.");
      return;
    }

    try {
      setLoading(true);
      await postMakeupSave(imageName, recommendData);
      alert("저장 완료!");
      navigate("/my"); // 저장 후 이동 경로는 필요에 맞게 수정
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 되돌리기: 커스터마이징 적용 이전(=원본 상태)으로 복구
  const undoToOriginal = () => {
    if (!originalUrl) return;
    setEditedUrl(originalUrl);
  };

  const startPeek = () => originalUrl && setPeekOriginal(true);
  const endPeek = () => setPeekOriginal(false);

  return (
    <S.Screen>
      <Header text="스타일 추천" right="close" left="back" />

      <S.Body>
        {/* 상단 큰 프리뷰 */}
        <S.PreviewWrap>
          <S.ImageBox>
            {displayUrl ? (
              <img
                src={displayUrl}
                alt={peekOriginal ? "원본 미리보기" : "AI 스타일 결과"}
                draggable={false}
              />
            ) : (
              <S.PlaceholderText>이미지를 불러오는 중...</S.PlaceholderText>
            )}

            {/* 원본 잠깐 보기 버튼 (이미지 있을 때만) */}
            {hasImage && (
              <S.OriginalPeekBtn
                type="button"
                aria-label="원본 잠깐 보기"
                onMouseDown={startPeek}
                onMouseUp={endPeek}
                onMouseLeave={endPeek}
                onTouchStart={startPeek}
                onTouchEnd={endPeek}
              >
                <S.PeekIcon aria-hidden />
              </S.OriginalPeekBtn>
            )}
          </S.ImageBox>
        </S.PreviewWrap>

        {/* 캡션 */}
        <S.Caption>
          <strong>000</strong>님을 위해 맞춤 생성된
          <br />
          AI 스타일 추천 이미지가 완성되었어요.
        </S.Caption>

        {/* 하단 고정 영역: 버튼들 아래 배치 */}
        <S.Footer>
          <S.ActionRow>
            <Button variant="line" size="medium" onClick={undoToOriginal} disabled={loading}>
              되돌리기
            </Button>
            <Button size="medium" onClick={goCustomize} disabled={loading || !imageName}>
              커스터마이징
            </Button>
          </S.ActionRow>

          <S.SaveBar>
            <Button size="xlarge" onClick={saveToList} disabled={loading || !imageName || !recommendData}>
              {loading ? "처리 중..." : "저장하기"}
            </Button>
          </S.SaveBar>
        </S.Footer>
      </S.Body>
    </S.Screen>
  );
};

export default StyleResultPage;
