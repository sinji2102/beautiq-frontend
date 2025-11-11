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
};

const StyleResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  // 결과/원본 이미지 URL
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);

  // 길게 눌러 원본 잠깐 보기
  const [peekOriginal, setPeekOriginal] = useState(false);

  // 최초/복귀 진입 시 NavState 반영
  useEffect(() => {
    if (navState.originalUrl) setOriginalUrl(navState.originalUrl);
    if (navState.editedUrl ?? undefined) setEditedUrl(navState.editedUrl || null);
  }, [navState.originalUrl, navState.editedUrl]);

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [originalUrl, editedUrl]);

  // 표시용 URL: (원본 미리보기 중이면 원본) 아니면 (편집본 또는 원본)
  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);

  const goCustomize = () =>
    navigate("/style/customizing", {
      state: {
        originalUrl: originalUrl,
        editedUrl: editedUrl ?? originalUrl, // 편집본 없으면 원본을 들고가서 시작
      } as NavState,
    });

  // 되돌리기: 커스터마이징 적용 이전(=원본 상태)으로 복구
  const undoToOriginal = () => {
    if (!originalUrl) return;
    setEditedUrl(originalUrl);
  };

  // 저장하기: "추천스타일 확인" 목록(LocalStorage) 에 추가
  const saveToList = () => {
    // TODO : API 연결하기

  };

  const startPeek = () => originalUrl && setPeekOriginal(true);
  const endPeek = () => setPeekOriginal(false);


  return (
    <S.Screen>
      <Header text="스타일 추천" right="close" left="back"/>

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
            {/* TODO : API 연결할 때 커스터마이징이면 뒤로가기 가능하도록 */}
            <Button variant="line" size="medium" onClick={undoToOriginal}>되돌리기</Button>
            <Button size="medium" onClick={goCustomize}>커스터마이징</Button>
          </S.ActionRow>

          <S.SaveBar>
            <Button size="xlarge" onClick={saveToList}>저장하기</Button>
          </S.SaveBar>
        </S.Footer>
      </S.Body>
    </S.Screen>
  );
};

export default StyleResultPage;