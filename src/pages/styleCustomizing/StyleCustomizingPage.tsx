import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import { useTheme } from "@emotion/react";
import Slider, { type SliderProps } from "@mui/material/Slider";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./StyleCustomizingPage.styled";

type NavState = {
  /** 커스터마이징 전 이미지(= 최초 생성본) */
  originalUrl?: string | null;
  /** 커스터마이징 적용 결과 이미지(있으면 우선 표시) */
  editedUrl?: string | null;
};

type FacePart = "skin" | "lip" | "eye" | "cheek";

const PART_LABEL: Record<FacePart, string> = {
  skin: "피부",
  lip: "입술",
  eye: "눈",
  cheek: "뺨",
};

const StyleCustomizingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as NavState | undefined;

  // Emotion Theme (타입은 @types/emotion.d.ts에서 확장)
  const theme = useTheme();
  const primary500 = theme.colors?.primary?.[500] ?? "#ED4785";

  /** 결과/원본 이미지 */
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);

  /** 원본 잠깐 보기 */
  const [peekOriginal, setPeekOriginal] = useState(false);

  /** 선택된 파트 + 각 파트의 강도 값(0~100) */
  const [selected, setSelected] = useState<FacePart | null>(null);
  const [values, setValues] = useState<Record<FacePart, number>>({
    skin: 50,
    lip: 50,
    eye: 50,
    cheek: 50,
  });

  /** 최초/복귀 진입 시 nav state 반영 */
  useEffect(() => {
    setOriginalUrl(navState?.originalUrl ?? null);
    setEditedUrl(navState?.editedUrl ?? null);
  }, [navState]);

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [originalUrl, editedUrl]);

  /** 실제로 화면에 보여줄 이미지 */
  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);

  /** 슬라이더 변경 (MUI 타입 그대로 사용) */
  const onChangeSlider: NonNullable<SliderProps["onChange"]> = (_e, value) => {
    if (!selected) return;
    const v = Array.isArray(value) ? value[0] : value;
    setValues((prev) => ({ ...prev, [selected]: v }));
    // TODO: 슬라이더 변경에 맞춰 실시간 미리보기 반영 (API/Canvas 연결 예정)
  };

  /** 적용/저장 */
  const applyCustomize = () => {
    // TODO: 서버로 커스터마이징 요청 후 결과 URL 세팅
    setEditedUrl(originalUrl);
    navigate("/styleResult", {
      replace: true,
      state: {
        originalUrl,
        editedUrl: originalUrl, // 실제 구현 시 가공된 url로 교체
      } satisfies NavState,
    });
  };

  const startPeek = () => originalUrl && setPeekOriginal(true);
  const endPeek = () => setPeekOriginal(false);

  return (
    <S.Screen>
      <Header text="커스터마이징" right="close" left="back" />

      <S.Body>
        {/* 프리뷰 */}
        <S.PreviewWrap>
          <S.ImageBox>
            {displayUrl ? (
              <img
                src={displayUrl}
                alt={peekOriginal ? "원본 미리보기" : "커스터마이징 프리뷰"}
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

        {/* 카테고리 버튼 */}
        <S.CategoryRow>
          {(Object.keys(PART_LABEL) as FacePart[]).map((part) => (
            <div key={part} style={{ display: "grid", justifyItems: "center" }}>
              <S.CategoryBtn
                type="button"
                active={selected === part}
                onClick={() => setSelected((prev) => (prev === part ? null : part))}
                aria-pressed={selected === part}
                aria-label={PART_LABEL[part]}
              >
                {/* TODO: 아이콘 교체 */}
                {PART_LABEL[part].slice(0, 1)}
              </S.CategoryBtn>
              <S.CategoryLabel>{PART_LABEL[part]}</S.CategoryLabel>
            </div>
          ))}
        </S.CategoryRow>

        {/* 슬라이더 (선택 시 노출) */}
        {selected && (
          <S.ControlWrap>
            <Slider
              value={values[selected]}
              onChange={onChangeSlider}
              aria-label={`${PART_LABEL[selected]} 강도`}
              min={0}
              max={100}
              sx={{
                height: 6,
                "& .MuiSlider-track": { border: "none" },
                "& .MuiSlider-thumb": {
                  width: 18,
                  height: 18,
                  "&:focus, &:hover, &.Mui-active": {
                    boxShadow: "0 0 0 8px rgba(237,71,133,0.16)",
                  },
                },
                color: primary500,
              }}
            />
          </S.ControlWrap>
        )}

        {/* 하단 버튼 */}
        <S.Footer>
          <Button
            size="xlarge" onClick={applyCustomize} disabled={!hasImage}
          >
            적용하기
          </Button>
        </S.Footer>

      </S.Body>
    </S.Screen>
  );
};

export default StyleCustomizingPage;
