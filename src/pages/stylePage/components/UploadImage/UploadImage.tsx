import Button from "@components/commons/button/Button";
import type { StyleContentsProps } from "@pages/stylePage/types";
import React, { useEffect, useRef, useState } from "react";

import * as S from "./UploadImage.styled";

type UploadImageProps = {
  /** 전체 컨텐츠 리스트 */
  contents: StyleContentsProps[];
  /** contents 갱신 setter */
  setContents: React.Dispatch<React.SetStateAction<StyleContentsProps[]>>;
  /** 현재 아이템 번호(또는 id에 매핑할 index) */
  itemNumber: number;
  /** 기존 사진 사용하기 동작 */
  onUseExisting: () => void;
};

const UploadImage: React.FC<UploadImageProps> = ({ contents, setContents, itemNumber }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openFile = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    setContents((prev) =>
      prev.map((c) => (c.itemId === itemNumber ? { ...c, itemImage: file } : c))
    );

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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const targetItem = contents.find((c) => c.itemId === itemNumber);
  const itemImage = targetItem?.itemImage as File | string | undefined | null;
  const itemImageUrl = typeof itemImage === "string" ? itemImage : null;

  const hasImage = Boolean(previewUrl || itemImageUrl);

  return (
    <S.Wrap>
      {hasImage ? (
        <S.Preview>
          <img src={previewUrl ?? itemImageUrl ?? ""} alt="이미지 미리보기" />
          <button className="remove" onClick={removeFile} aria-label="이미지 삭제" type="button">
            <S.CloseIcon aria-hidden />
          </button>
        </S.Preview>
      ) : (
        <S.Placeholder>
          <S.CamIcon aria-hidden />
        </S.Placeholder>
      )}

      <S.Hint>* 얼굴이 정면으로 나온 사진을 사용해 주세요.</S.Hint>

      <S.BtnRow>
        <Button size="small" variant="primary" onClick={openFile}>
          사진 업로드하기
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
