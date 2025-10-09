import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import type { ContentsProps, ItemProps } from "@pages/stylePage/types";
import React, { useEffect, useMemo, useRef, useState } from "react";

import * as S from "./ChooseAIStylePage.styled";

const ChooseAIStylePage: React.FC = () => {
  // URL 목록은 한 번만 생성
  const presetUrls = useMemo(
    () => [
      {
        imgaeName: "sample1",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
      },
      {
        imgaeName: "sample2",
        url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      },
      {
        imgaeName: "sample3",
        url: "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?q=80&w=800&auto=format&fit=crop",
      },
    ],
    []
  );

  const defaultItemInfo: ItemProps = useMemo(
    () => ({ name: "", content: "", category: "" }),
    []
  );

  // itemId 1~3: URL, 4: 업로드 타일
  const initial: ContentsProps[] = useMemo(
    () => [
      { itemId: 1, itemImage: presetUrls[0].url, itemInfo: defaultItemInfo },
      { itemId: 2, itemImage: presetUrls[1].url, itemInfo: defaultItemInfo },
      { itemId: 3, itemImage: presetUrls[2].url, itemInfo: defaultItemInfo },
      { itemId: 4, itemImage: undefined, itemInfo: defaultItemInfo },
    ],
    [presetUrls, defaultItemInfo]
  );

  const [contents, setContents] = useState<ContentsProps[]>(initial);

  // 어떤 타일이 선택되었는지 (1~4 중 1개 또는 null)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 4번 업로드 타일 프리뷰 관리
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFile = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    setContents((prev) =>
      prev.map((c) => (c.itemId === 4 ? { ...c, itemImage: file } : c))
    );
    // 업로드 타일을 선택 상태로 전환
    setSelectedId(4);
  };

  const removeFile = () => {
    setContents((prev) =>
      prev.map((c) => (c.itemId === 4 ? { ...c, itemImage: undefined } : c))
    );
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    // 업로드 이미지를 지우면 선택도 해제
    setSelectedId(null);
  };

  // 4번 타일 File/URL 변화에 따라 미리보기 URL 관리
  useEffect(() => {
    const item4 = contents.find((c) => c.itemId === 4);
    const img = item4?.itemImage;

    setPreviewUrl((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });

    if (img instanceof File) {
      const url = URL.createObjectURL(img);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof img === "string") {
      setPreviewUrl(img);
    }
  }, [contents]);

  const uploaded4 = Boolean(contents.find((c) => c.itemId === 4)?.itemImage);

  // 다음으로 버튼 활성화 조건:
  // - selectedId가 1,2,3 중 하나면 OK
  // - selectedId가 4면 업로드된 이미지가 있어야 OK
  const canNext =
    selectedId !== null && (selectedId !== 4 || (selectedId === 4 && uploaded4));

  return (
    <>
    <Header left="back" text="스타일 추천"/>
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
                if (e.key === "Enter" || e.key === " ") setSelectedId(c.itemId);
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
            onClick={() => {
              // 업로드 이미지를 아직 안 골랐으면 파일 선택창 열기
              if (!uploaded4) openFile();
              // 이미 업로드가 되어 있다면 선택 토글만 처리
              setSelectedId(4);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (!uploaded4) openFile();
                setSelectedId(4);
              }
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
          size="xlarge"          // 필요에 맞게 large/xlarge 선택
          variant="primary"
          disabled={!canNext}     // 4칸 중 정확히 1개 선택 + (4번이면 업로드됨)일 때만 활성화
          onClick={() => {
          if (!canNext) return;
          // TODO: 다음 단계 이동 로직 (onNext?.(contents) 같은 콜백 쓰면 여기에)
          }}
        >
          다음으로
        </Button>
      </S.BottomBar>
    </S.Screen></>
    
  );
};

export default ChooseAIStylePage;