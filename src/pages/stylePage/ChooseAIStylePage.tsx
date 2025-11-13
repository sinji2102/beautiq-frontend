import { postMakeupSimulation } from "@apis/domain/makeup/api"; // ✅ 시뮬레이션 API 추가
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import type { ContentsProps, ItemProps } from "@pages/stylePage/types";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./ChooseAIStylePage.styled";

const DEFAULT_ITEM_INFO: ItemProps = { name: "", content: "", category: "" };

// 샘플 URL 목록
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

// URL → File 변환 유틸
async function urlToFile(
  url: string,
  filename = "image.jpg",
  mime = "image/jpeg"
): Promise<File> {
  const res = await fetch(url, { cache: "no-store" });
  const blob = await res.blob();
  return new File([blob], filename, { type: mime });
}

const ChooseAIStylePage: React.FC = () => {
  const navigate = useNavigate();

  // itemId 1~3: URL, 4: 업로드 타일
  const initial: ContentsProps[] = [
    { itemId: 1, itemImage: presetUrls[0].url, itemInfo: DEFAULT_ITEM_INFO },
    { itemId: 2, itemImage: presetUrls[1].url, itemInfo: DEFAULT_ITEM_INFO },
    { itemId: 3, itemImage: presetUrls[2].url, itemInfo: DEFAULT_ITEM_INFO },
    { itemId: 4, itemImage: undefined, itemInfo: DEFAULT_ITEM_INFO },
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

  const handleFile = (file: File) => {
    setContents((prev) =>
      prev.map((c) => (c.itemId === 4 ? { ...c, itemImage: file } : c))
    );
    setSelectedId(4); // 업로드 타일 선택
  };

  const removeFile = () => {
    setContents((prev) =>
      prev.map((c) =>
        c.itemId === 4 ? { ...c, itemImage: undefined } : c
      )
    );
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    setSelectedId(null);
  };

  // 4번 타일 File/URL 변화에 따라 미리보기 URL 관리 (이전 blob URL 메모리 정리)
  useEffect(() => {
    const item4 = contents.find((c) => c.itemId === 4);
    const img = item4?.itemImage;

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
    contents.find((c) => c.itemId === 4)?.itemImage
  );

  // 다음으로 버튼 활성화: 하나 선택 + (4번이면 업로드 있음)
  const canNext = Boolean(selectedId && (selectedId !== 4 || uploaded4));

  const handleClickUpload = () => {
    if (!uploaded4) openFile();
    setSelectedId(4);
  };

  // ✅ 다음 단계: 선택한 이미지를 시뮬레이션 API로 보내고 결과와 함께 이동
  const goNext = async () => {
    if (!canNext || selectedId == null) return;

    let fileToPass: File | null = null;

    if (selectedId === 4) {
      const img = contents.find((c) => c.itemId === 4)?.itemImage;
      if (img instanceof File) {
        fileToPass = img;
      } else {
        alert("업로드된 이미지가 없습니다.");
        return;
      }
    } else {
      // 1~3번: URL → File 변환 후 시뮬레이션 API로 전달
      const c = contents.find((v) => v.itemId === selectedId);
      if (!c || typeof c.itemImage !== "string") return;
      const presetMeta = presetUrls[selectedId - 1];
      fileToPass = await urlToFile(
        c.itemImage,
        `${presetMeta.imageName}.jpg`,
        "image/jpeg"
      );
    }

    if (!fileToPass) return;

    try {
      setLoading(true);

      // 🔥 시뮬레이션 API 호출
      const simRes = await postMakeupSimulation(fileToPass);
      if (!simRes) {
        alert("이미지 시뮬레이션에 실패했습니다.");
        return;
      }

      // simRes: { imageName, imageUrl, ... } 형태라고 가정
      navigate("/style/recommend", {
        state: {
          // 다음 페이지가 사용할 값들
          originalUrl: simRes.imageUrl, // 프리뷰용
          imageName: simRes.imageName,  // 이후 customize/save에 필요
          // 필요하면 원본 파일도 같이 넘겨두기
          styleImageFile: fileToPass,
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
            {contents.slice(0, 3).map((c) => (
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
                {typeof c.itemImage === "string" && (
                  <img src={c.itemImage} alt={`샘플 ${c.itemId}`} />
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