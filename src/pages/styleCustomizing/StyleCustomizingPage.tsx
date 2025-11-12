import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import { useTheme } from "@emotion/react";
import Slider, { type SliderProps } from "@mui/material/Slider";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./StyleCustomizingPage.styled";

type NavState = {
  originalUrl?: string | null;
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

  const eTheme = useTheme();
  const primary500 = eTheme.colors?.primary?.[500] ?? "#ED4785";

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: { primary: { main: primary500 } },
      }),
    [primary500]
  );

  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);
  const [peekOriginal, setPeekOriginal] = useState(false);

  const [selected, setSelected] = useState<FacePart | null>(null);
  const [values, setValues] = useState<Record<FacePart, number>>({
    skin: 50,
    lip: 50,
    eye: 50,
    cheek: 50,
  });

  /** ✅ 사용자가 슬라이더 값을 바꿨는지 여부 */
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setOriginalUrl(navState?.originalUrl ?? null);
    setEditedUrl(navState?.editedUrl ?? null);
  }, [navState]);

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [originalUrl, editedUrl]);

  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);

  /** 슬라이더 변경 → 값 반영 + dirty 활성화 */
  const onChangeSlider: NonNullable<SliderProps["onChange"]> = (_e, value) => {
    if (!selected) return;
    const v = Array.isArray(value) ? value[0] : value;

    setValues((prev) => {
      if (prev[selected] !== v) {
        setDirty(true);
      }
      return { ...prev, [selected]: v };
    });
  };

  /** 적용 */
  const applyCustomize = () => {
    // TODO: 서버 커스터마이징 호출 후 결과 URL 반영
    setEditedUrl(originalUrl);
    setDirty(false);
    navigate("/styleResult", {
      replace: true,
      state: {
        originalUrl,
        editedUrl: originalUrl, // 실제 구현 시 처리된 결과 URL로 교체
      } as NavState,
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
                  {/* ✅ 아이콘 삽입 (버튼의 currentColor를 그대로 사용) */}
                  <S.IconCategory aria-hidden />
                </S.CategoryBtn>
                <S.CategoryLabel>{PART_LABEL[part]}</S.CategoryLabel>
              </div>
            ))}
          </S.CategoryRow>

          {/* 슬라이더 (선택 시 노출) */}
          {selected && (
            <S.ControlWrap>
              
      <MuiThemeProvider theme={muiTheme}>
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
              </MuiThemeProvider>
            </S.ControlWrap>
          )}

          {/* 하단 버튼 */}
          <S.Footer>
            <Button
              size="xlarge"
              onClick={applyCustomize}
              disabled={!hasImage || !dirty}
            >
              적용하기
            </Button>
          </S.Footer>
        </S.Body>
    </S.Screen>
  );
};

export default StyleCustomizingPage;
