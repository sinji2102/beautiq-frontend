import type { MakeupCustomizeRequest, MakeupCustomizeResponse, MakeupRecommendationRequest } from "@apis/domain/makeup/api";
import { postCustomize } from "@apis/domain/makeup/api";
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import { useTheme } from "@emotion/react";
import Slider, { type SliderProps } from "@mui/material/Slider";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./StyleCustomizingPage.styled";

type NavState = {
  /** 커스터마이징 전 이미지(= 최초 생성본) */
  originalUrl?: string | null;
  /** 직전 단계 결과 이미지 (없으면 originalUrl 사용) */
  editedUrl?: string | null;
  /** 시뮬레이션/직전 결과의 이미지 이름 */
  imageName?: string | null;
  /** 저장 시 사용할 추천 요청 DTO (키워드 등) */
  recommendData?: MakeupRecommendationRequest | null;
};

type FacePart = "skin" | "lip" | "eye" | "cheek";

const PART_LABEL: Record<FacePart, string> = {
  skin: "피부",
  lip: "입술",
  eye: "눈",
  cheek: "뺨",
};

/** base64 → data URL (png 가정) */
const asDataUrl = (b64?: string | null) => (b64 ? `data:image/png;base64,${b64}` : null);

const StyleCustomizingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  const eTheme = useTheme();
  const primary500 = eTheme.colors?.primary?.[500] ?? "#ED4785";

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: { primary: { main: primary500 } },
      }),
    [primary500]
  );

  // 전달받은 네비게이션 상태
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [recommendData, setRecommendData] = useState<MakeupRecommendationRequest | null>(null);

  // 원본 잠깐 보기
  const [peekOriginal, setPeekOriginal] = useState(false);

  // 선택 파트 & 강도값
  const [selected, setSelected] = useState<FacePart | null>(null);
  const [values, setValues] = useState<Record<FacePart, number>>({
    skin: 50,
    lip: 50,
    eye: 50,
    cheek: 50,
  });

  // 사용자가 슬라이더 값을 바꿨는지
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  // 최초/복귀 진입 시 NavState 반영
  useEffect(() => {
    setOriginalUrl(navState.originalUrl ?? null);
    setEditedUrl(navState.editedUrl ?? navState.originalUrl ?? null);
    setImageName(navState.imageName ?? null);
    setRecommendData(navState.recommendData ?? null);
    // 의존성은 개별 필드만
  }, [navState.originalUrl, navState.editedUrl, navState.imageName, navState.recommendData]);

  const hasImage = useMemo(() => !!(originalUrl || editedUrl), [originalUrl, editedUrl]);

  // 표시용 URL: (원본 미리보기 중이면 원본) 아니면 (편집본 또는 원본)
  const displayUrl = useMemo(() => {
    if (peekOriginal && originalUrl) return originalUrl;
    return editedUrl || originalUrl || null;
  }, [peekOriginal, originalUrl, editedUrl]);

  /** 슬라이더 변경 → 값 반영 + dirty 활성화 */
  const onChangeSlider: NonNullable<SliderProps["onChange"]> = (_e, value) => {
    if (!selected) return;
    const v = Array.isArray(value) ? value[0] : value;
    setValues((prev) => {
      if (prev[selected] !== v) setDirty(true);
      return { ...prev, [selected]: v };
    });
  };

  /** 적용: /makeup/customize 호출 → base64 결과를 미리보기로 반영하고 결과 페이지로 복귀 */
  const applyCustomize = async () => {
    if (!imageName) {
      alert("이미지 이름이 없습니다. 이전 단계부터 다시 진행해 주세요.");
      return;
    }
    if (!selected) {
      alert("먼저 커스터마이징할 부위를 선택해 주세요.");
      return;
    }

    try {
      setLoading(true);

      // CustomizeRequestDto 구조에 맞게 data 작성
      // (실제 스키마의 필드명/중첩 구조가 다르면 여기를 조정)
      const data: MakeupCustomizeRequest = {
        edits: {
          region: selected,
          intensity: values[selected],
        },
      } as unknown as MakeupCustomizeRequest;

      const res: MakeupCustomizeResponse | null = await postCustomize(imageName, data);
      if (!res) {
        alert("커스터마이징에 실패했습니다.");
        return;
      }

      // 응답 타입 예시: { status?: string; result_image_base64?: string; message?: string; ... }
      const nextUrl = asDataUrl((res as MakeupCustomizeResponse).imageUrl) ?? editedUrl;
      setEditedUrl(nextUrl ?? null);
      setDirty(false);

      // 결과 페이지로 되돌아가기 (imageName/recommendData 유지)
      navigate("/styleResult", {
        replace: true,
        state: {
          originalUrl,
          editedUrl: nextUrl,
          imageName,
          recommendData,
        } as NavState,
      });
    } catch (err) {
      console.error(err);
      alert("커스터마이징 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const startPeek = () => originalUrl && setPeekOriginal(true);
  const endPeek = () => setPeekOriginal(false);

  // 적용 가능 조건
  const canApply = hasImage && dirty && !!selected && !loading;

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
          <Button size="xlarge" onClick={applyCustomize} disabled={!canApply}>
            {loading ? "적용 중..." : "적용하기"}
          </Button>
        </S.Footer>
      </S.Body>
    </S.Screen>
  );
};

export default StyleCustomizingPage;
