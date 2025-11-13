import type { MakeupRecommendationRequest } from "@apis/domain/makeup/api";
import { postMakeupSave } from "@apis/domain/makeup/api";
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./StyleResultPage.styled";

type NavState = {
  originalUrl?: string | null;
  editedUrl?: string | null;
  imageName?: string | null;
  recommendData?: MakeupRecommendationRequest["keywords"] | null;
};

const StyleResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  // const [recommendData, setRecommendData] =
  //   useState<MakeupRecommendationRequest["keywords"] | null>(null);
    const [recommendData, setRecommendData] =
    useState<MakeupRecommendationRequest["keywords"] | null>(["사랑스러운"]);
  const [loading, setLoading] = useState(false);

  const [peekOriginal, setPeekOriginal] = useState(false);

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

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [
    originalUrl,
    editedUrl,
  ]);

  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);


  /** 🔁 커스터마이징 페이지로 이동만 (API 호출 없음) */
  const goCustomize = () => {
    if (!imageName) {
      alert("이미지 이름이 없습니다. 시뮬레이션부터 다시 진행해주세요.");
      return;
    }

    navigate("/style/customizing", {
      state: {
        originalUrl,
        editedUrl,
        imageName,
        recommendData,
      } as NavState,
    });
  };

  /** 저장하기 */
  const saveToList = async () => {
    if (!imageName || !recommendData) {
      alert("저장할 데이터가 없습니다.");
      return;
    }

    try {
      setLoading(true);
      await postMakeupSave(imageName, recommendData);
      alert("저장 완료!");
      // navigate("/my");
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

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

        <S.Caption>
          <strong>000</strong>님을 위해 맞춤 생성된
          <br />
          AI 스타일 추천 이미지가 완성되었어요.
        </S.Caption>

        <S.Footer>
          <S.ActionRow>
            <Button
              variant="line"
              size="medium"
              onClick={undoToOriginal}
              disabled={loading}
            >
              되돌리기
            </Button>
            <Button
              size="medium"
              onClick={goCustomize}
              disabled={loading || !imageName}
            >
              커스터마이징
            </Button>
          </S.ActionRow>

          <S.SaveBar>
            <Button
              size="xlarge"
              onClick={saveToList}
              // 키워드까지 보내도록 반영
              // disabled={loading || !imageName || !recommendData}
              disabled={loading || !imageName}
            >
              {loading ? "처리 중..." : "저장하기"}
            </Button>
          </S.SaveBar>
        </S.Footer>
      </S.Body>
    </S.Screen>
  );
};

export default StyleResultPage;
