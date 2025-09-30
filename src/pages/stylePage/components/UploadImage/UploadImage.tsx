import Button from "@components/commons/button/Button";
import type { ContentsProps } from "@pages/stylePage/types";
import React, { useEffect, useRef, useState } from "react";

import * as S from "./UploadImage.styled";

type UploadImageProps = {
  image: string | null;
  onRemove: () => void;
  contents?: ContentsProps[];
  onPickFile: (file: File) => void;
  setContents?: React.Dispatch<React.SetStateAction<ContentsProps[]>>;
  itemNumber?: number;
  /** (선택) 기존 사진 사용하기 동작이 필요하면 전달하세요. 없으면 버튼은 disabled 처리됩니다. */
  onUseExisting?: () => void;
  canUseExisting?: boolean;
};

const UploadImage: React.FC<UploadImageProps> = ({
  contents,
  setContents,
  itemNumber,
  onUseExisting,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openFile = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    // contents 상태에 파일만 반영 (타입 유지)
    setContents?.((prev) =>
      prev.map((c) => (c.itemId === itemNumber ? { ...c, itemImage: file } : c))
    );
    // 이전 URL 정리 후 새 미리보기 URL 생성
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const removeFile = () => {
    setContents?.((prev) =>
      prev.map((c) => (c.itemId === itemNumber ? { ...c, itemImage: undefined } : c))
    );
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  // 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const targetItem = contents?.find((c) => c.itemId === itemNumber);
  const itemImage = targetItem?.itemImage as unknown;
  const itemImageUrl = typeof itemImage === "string" ? (itemImage as string) : null;

  const hasImage = !!previewUrl || !!itemImageUrl;

  return (
    <S.Wrap>
      {hasImage ? (
        <S.Preview>
          {previewUrl ? (
            <img src={previewUrl} alt="이미지 미리보기" />
          ) : itemImageUrl ? (
            <img src={itemImageUrl} alt="이미지 미리보기" />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
              이미지 등록됨
            </div>
          )}
          <button className="remove" onClick={removeFile} aria-label="이미지 삭제">
            ×
          </button>
        </S.Preview>
      ) : (
        <S.Placeholder>
          <span className="cam">📷</span>
        </S.Placeholder>
      )}

      <S.Hint>*얼굴이 정면으로 나오는 사진을 사용해 주세요.</S.Hint>

      {/* 버튼 2개: 동일 너비로 정렬 (UploadImage.styled.ts의 BtnRow와 매칭) */}
      <S.BtnRow>
        <Button size="small" onClick={onUseExisting}>기존 사진 사용하기</Button>
        <label htmlFor={`upload-input-${itemNumber}`}>
          <Button size="small" onClick={openFile} >
            새 사진 사용하기
          </Button>
        </label>

        <input
          id={`upload-input-${itemNumber}`}
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </S.BtnRow>
    </S.Wrap>
  );
};

export default UploadImage;