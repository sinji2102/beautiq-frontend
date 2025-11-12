import Button from "@components/commons/button/Button";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./UploadImage.styled";

const UploadImage: React.FC = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ✅ 사진 영역 클릭 시 파일 선택창을 엽니다.
  const openFile = () => inputRef.current?.click();

  // ✅ 파일을 받아 미리보기 URL을 생성하고 상태에 저장합니다.
  const handleFile = (file: File) => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev); // 이전 URL 해제 (메모리 누수 방지)
      return URL.createObjectURL(file);
    });
  };

  // ✅ 업로드된 이미지를 제거하고 입력창과 미리보기를 초기화합니다.
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev); // 기존 URL 해제
      return null;
    });
    if (inputRef.current) inputRef.current.value = ""; // input 값 초기화
  };

  // ✅ 컴포넌트가 언마운트되거나 previewUrl이 바뀔 때 메모리 해제 수행
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const hasImage = Boolean(previewUrl);

  // 피부 분석 버튼이 눌렸을때, 오출되는 함수
  const TestOnClick = () => {
    navigate("/skinAnalysis/loading");
  };

  return (
    <S.Wrap>
      {hasImage ? (
        // ✅ 이미지가 있을 경우 미리보기와 삭제 버튼을 표시
        <S.Preview onClick={openFile}>
          <img src={previewUrl ?? ""} alt="이미지 미리보기" />
          <button className="remove" onClick={removeFile} aria-label="이미지 삭제" type="button">
            <S.CloseIcon />
          </button>
        </S.Preview>
      ) : (
        // ✅ 이미지가 없을 경우 카메라 아이콘이 있는 placeholder 표시
        <S.Placeholder onClick={openFile}>
          <S.PlaceholderMainText>이미지 업로드</S.PlaceholderMainText>
          <S.PlaceholderSubText>
            {`피부 분석을 위해서 얼굴 사진을 업로드 해 주세요\n 정면 사진일 수록 정확도가 올라갑니다!`}
          </S.PlaceholderSubText>
        </S.Placeholder>
      )}

      {hasImage ? (
        // 이미지가 있는 경우 버튼 활성화
        <Button size="xlarge" children="피부 분석" onClick={TestOnClick} />
      ) : (
        // 이미지가 없는 경우 버튼 비활성화
        <Button size="xlarge" disabled={true} children="피부 분석" />
      )}

      <input
        id="upload-input"
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </S.Wrap>
  );
};

export default UploadImage;
