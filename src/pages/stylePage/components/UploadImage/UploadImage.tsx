// src/pages/stylePage/components/UploadImage/UploadImage.tsx
import Button from "@components/commons/button/Button";
import type { ContentsProps } from "@pages/stylePage/types";
import React, { useEffect, useRef, useState } from "react";

import * as S from "./UploadImage.styled";

type UploadImageProps = {
  /** 전체 컨텐츠 리스트 */
  contents: ContentsProps[];
  /** contents 갱신 setter */
  setContents: React.Dispatch<React.SetStateAction<ContentsProps[]>>;
  /** 현재 아이템 번호(또는 id에 매핑할 index) */
  itemNumber: number;
  /** 기존 사진 사용하기 동작 */
  onUseExisting: () => void;
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
    // contents 상태에 파일 반영
    setContents((prev) =>
      prev.map((c) => (c.itemId === itemNumber ? { ...c, itemImage: file } : c))
    );

    // 이전 미리보기 URL 정리 후 새 URL 생성
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const removeFile = () => {
    setContents((prev) =>
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

  // 현재 아이템 가져오기
  const targetItem = contents.find((c) => c.itemId === itemNumber);

  // 서버/상태에서 온 itemImage가 string(URL)일 수도, File일 수도 있다고 가정
const itemImage = targetItem?.itemImage as File | string | undefined | null;
const itemImageUrl = typeof itemImage === "string" ? itemImage : null;


  // 미리보기 우선 → 없으면 기존 URL
  const hasImage = Boolean(previewUrl || itemImageUrl);

  return (
    <S.Wrap>
      {hasImage ? (
        <S.Preview>
          <img src={previewUrl ?? itemImageUrl ?? ""} alt="이미지 미리보기" />
          <button
            className="remove"
            onClick={removeFile}
            aria-label="이미지 삭제"
            type="button"
          >
          <img
            src="/svgs/icon-close.svg"
            alt=""
            aria-hidden
            width={20}
            height={20}
            />
          </button>
        </S.Preview>
      ) : (
        <S.Placeholder>
          <img
            src="/svgs/icon-cam.svg"
            alt=""
            aria-hidden
            className="cam"
            width={62}
            height={56}
          />
        </S.Placeholder>

      )}

      <S.Hint>* 얼굴이 정면으로 나온 사진을 사용해 주세요.</S.Hint>

      {/* 액션 영역 */}
      <S.BtnRow>
        <Button size="small" variant="line" onClick={onUseExisting}>
          기존 사진 사용하기
        </Button>

        <Button size="small" variant="primary" onClick={openFile}>
          새 사진 사용하기
        </Button>

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