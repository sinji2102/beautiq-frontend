import { postMakeupSimulation } from "@apis/domain/makeup/api"; // ✅ 시뮬레이션 API
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import type { ContentsProps } from "@pages/stylePage/types";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "./ChooseAIStylePage.styled";

// const DEFAULT_ITEM_INFO: ItemProps = { name: "", content: "", category: "" };

// 🔹 /style/recommend → /style/ai 에서 넘겨줄 때 형태 예시:
// navigate("/style/ai", { state: { recommendData: res.recommendations } });
type RecommendItem = {
  recommendImageName: string;
  recommendImageUrl: string;
};

type NavState = {
  recommendData?: RecommendItem[] | null;
};

// 샘플 URL 목록 (백업/초기용)
const presetUrls = [
  {
    imageName: "sample1",
    url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
  },
  {
    imageName: "sample2",
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
  },
  {
    imageName: "sample3",
    url: "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?q=80&w=800&auto=format&fit=crop",
  },
] as const;

const ChooseAIStylePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  // 기본은 preset 이미지로 시작
  const initial: ContentsProps[] = [
    { itemId: 1, recommendImageUrl: presetUrls[0].url,  recommendImageName: ""},
    { itemId: 2, recommendImageUrl: presetUrls[1].url,  recommendImageName: ""},
    { itemId: 3, recommendImageUrl: presetUrls[2].url, recommendImageName: ""},
    { itemId: 4, recommendImageUrl: undefined, recommendImageName: ""},
  ];

  const [contents, setContents] = useState<ContentsProps[]>(initial);

  // 어떤 타일이 선택되었는지 (1~4 중 1개 또는 null)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 4번 업로드 타일 프리뷰 관리
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 로딩 상태 (시뮬레이션 API 호출 중)
  const [loading, setLoading] = useState(false);

  const openFile = () => inputRef.current?.click();

  // 🔥 recommendData 가 오면 1~3번 타일을 AI 이미지로 덮어쓰기
  useEffect(() => {
    const recs = navState?.recommendData;
    // setRes(recs ?? undefined);

    // 🔥 recommendData 가 배열이 아니면 preset 그대로 사용
    if (!Array.isArray(recs) || recs.length === 0) {
      console.log("🔴 recommendData 없음 → preset 유지");
      return;
    }

    console.log("🟢 recommendData 로 contents 덮어씀:", recs);

    setContents((prev) => {
      const mapped: ContentsProps[] = recs.slice(0, 3).map((rec, idx) => {
        const url =
          rec.recommendImageUrl ??
          presetUrls[idx].url; // 그래도 없으면 preset fallback

        return {
          itemId: idx + 1,
          recommendImageName: rec.recommendImageName,
          recommendImageUrl: url,
        };
      });

      const item4 =
        prev.find((c) => c.itemId === 4) ??
        { itemId: 4, itemImage: undefined, recommendImageName: "", recommendImageUrl: undefined };

      return [...mapped, item4];
    });
  }, [navState?.recommendData]);

  const handleFile = (file: File) => {
    setContents((prev) =>
      prev.map((c) => (c.itemId === 4 ? { ...c, itemImage: file } : c)),
    );
    setSelectedId(4); // 업로드 타일 선택
  };

  const removeFile = () => {
    setContents((prev) =>
      prev.map((c) =>
        c.itemId === 4 ? { ...c, itemImage: undefined } : c,
      ),
    );
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    setSelectedId(null);
  };

  // 4번 타일 File/URL 변화에 따라 미리보기 URL 관리 (이전 blob URL 메모리 정리)
  useEffect(() => {
    const item4 = contents.find((c) => c.itemId === 4);
    const img = item4?.recommendImageName;

    // 기존 blob URL 정리
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });

    if (img instanceof File) {
      const url = URL.createObjectURL(img);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof img === "string") {
      setPreviewUrl(img);
    }

    return; // cleanup은 위 File 분기에서만
  }, [contents]);

  const uploaded4 = Boolean(
    contents.find((c) => c.itemId === 4)?.recommendImageName,
  );

  // 다음으로 버튼 활성화: 하나 선택 + (4번이면 업로드 있음)
  const canNext = Boolean(selectedId && (selectedId !== 4 || uploaded4));

  const handleClickUpload = () => {
    if (!uploaded4) openFile();
    setSelectedId(4);
  };

  // ✅ 다음 단계: 선택한 이미지를 (File 또는 URL) 시뮬레이션 API로 보내고 결과와 함께 이동
  const goNext = async () => {
    if (!canNext || selectedId == null) return;

    let imageToSend: File | string | null = null;

    if (selectedId === 4) {
      // 업로드된 이미지 (File)
      const img = contents.find((c) => c.itemId === 4)?.recommendImageName;
      if (img instanceof File) {
        imageToSend = img;
      } else {
        alert("업로드된 이미지가 없습니다.");
        return;
      }
    } else {
      // 1~3번 타일: (AI 추천으로 덮였든 샘플이든) URL 그대로 사용
      const c = contents.find((v) => v.itemId === selectedId);
      if (!c || typeof c.recommendImageName !== "string") return;
      imageToSend = c.recommendImageName;
    }

    if (!imageToSend) return;

    try {
      setLoading(true);

      // 시뮬레이션 API 호출 (File | string 둘 다 지원)
      const simRes = await postMakeupSimulation(imageToSend);
      console.log("🧪 postMakeupSimulation result:", simRes);

      if (!simRes) {
        alert("이미지 시뮬레이션에 실패했습니다.");
        return;
      }

      // simRes: { imageName, imageUrl, ... } 형태라고 가정
      navigate("/style/result", {
        state: {
          originalUrl: simRes.imageUrl, // 프리뷰용
          imageName: simRes.imageName,  // 이후 customize/save에 필요
          styleImageFile: imageToSend instanceof File ? imageToSend : null,
        },
      });
    } catch (error) {
      console.error(error);
      alert("스타일 시뮬레이션 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header left="back" text="스타일 추천" />
      <S.Screen>
        <S.Body>
          <S.GuideText>
            정확한 스타일 추천을 위해
            <br />
            서비스에서 제공하는 이미지를 선택하거나,
            <br />
            원하는 이미지를 넣어주세요
          </S.GuideText>

          <S.Grid>
            {/* 1~3 URL 타일 */}
            {contents?.slice(0, 3).map((c) => (
              <S.UrlTile
                key={c.itemId}
                role="button"
                tabIndex={0}
                selected={selectedId === c.itemId}
                onClick={() => setSelectedId(c.itemId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedId(c.itemId);
                }}
                aria-label={`샘플 이미지 ${c.itemId} 선택`}
              >
                {typeof c.recommendImageName === "string" && (
                  <img src={c.recommendImageUrl} alt={`샘플 ${c.itemId}`} />
                )}
              </S.UrlTile>
            ))}

            {/* 4번 업로드 타일 */}
            <S.PinkUploadTile
              role="button"
              tabIndex={0}
              selected={selectedId === 4}
              className={previewUrl ? "hasImage" : ""}
              onClick={handleClickUpload}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  handleClickUpload();
              }}
              aria-label="사진 업로드"
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="업로드 프리뷰" />
                  <button
                    className="remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    aria-label="이미지 삭제"
                    type="button"
                  >
                    <S.CloseIcon aria-hidden />
                  </button>
                </>
              ) : (
                <S.CamIcon aria-hidden />
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </S.PinkUploadTile>
          </S.Grid>
        </S.Body>

        <S.BottomBar>
          <Button
            size="xlarge"
            variant="primary"
            disabled={!canNext || loading}
            onClick={goNext}
          >
            {loading ? "분석 중..." : "다음으로"}
          </Button>
        </S.BottomBar>
      </S.Screen>
    </>
  );
};

export default ChooseAIStylePage;
