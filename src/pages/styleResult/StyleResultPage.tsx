import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./StyleResultPage.styled";

const StyleResultPage: React.FC = () => {
  const navigate = useNavigate();

  // 편집본 / 원본 URL (원본은 커스터마이징 전 이미지로 세팅해 주세요)
  const [editedUrl, setEditedUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  // 로컬 업로드(옵션): 필요 시 결과 화면에서도 파일 바꾸게 하려면 사용
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 원본 “잠깐 보기” 상태
  const [peekOriginal, setPeekOriginal] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있어요.");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert("15MB 이하 이미지만 업로드할 수 있습니다.");
        return;
      }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const url = URL.createObjectURL(file);
      setEditedUrl(url);
      setObjectUrl(url);
      // 원본이 비어 있다면 최초 업로드를 원본으로 간주
      if (!originalUrl) setOriginalUrl(url);
    },
    [objectUrl, originalUrl]
  );

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const openPicker = () => inputRef.current?.click();

  // 1) 다시 선택 → 커스터마이징 페이지로
  const goCustomize = () => {
    navigate("/style/customizing"); // 프로젝트 라우트에 맞춰 경로만 바꿔줘
  };

  // 2) 되돌리기 → 커스터마이징 이전(바로 전 페이지)로
  const goUndo = () => {
    navigate(-1);
  };

  // 3) 원본 보기 버튼(길게 누르는 동안만 원본)
  const startPeek = () => setPeekOriginal(true);
  const endPeek = () => setPeekOriginal(false);

  const displayUrl = peekOriginal && originalUrl ? originalUrl : editedUrl;

  return (
    <S.Screen>
      <S.HeaderBar>
        <button className="nav" aria-label="뒤로" onClick={() => navigate(-1)}>
          <S.BackIcon aria-hidden />
        </button>
        <span className="title">스타일 확인</span>
        <button className="nav" aria-label="닫기" onClick={() => navigate("/")}>
          <S.CloseIcon aria-hidden />
        </button>
      </S.HeaderBar>

      <S.Body>
        {/* 로컬에서 파일 교체하고 싶을 때만 사용 */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />

        <S.PreviewWrap>
          <S.ImageBox onClick={openPicker}>
            {displayUrl ? (
              <img src={displayUrl} alt={peekOriginal ? "원본 미리보기" : "편집본 미리보기"} />
            ) : (
              <S.PlaceholderText>이미지를 선택하거나 결과를 불러오세요</S.PlaceholderText>
            )}

            {/* 3) 원본 잠깐 보기 버튼 (우하단 고정) */}
            {(editedUrl || originalUrl) && (
              <S.OriginalPeekBtn
                type="button"
                aria-label="원본 잠깐 보기"
                onMouseDown={startPeek}
                onMouseUp={endPeek}
                onMouseLeave={endPeek}
                onTouchStart={startPeek}
                onTouchEnd={endPeek}
              >
                {/* 아이콘/문자 자유롭게 */}
                <S.PeekIcon aria-hidden />
              </S.OriginalPeekBtn>
            )}
          </S.ImageBox>
        </S.PreviewWrap>

        <S.Caption>
          <strong>000</strong>님을 위해 맞춤 생성된
          <br />
          AI 스타일 추천 이미지가 완성되었어요.
        </S.Caption>

        <S.ActionRow>
          <S.SecondaryBtn type="button" onClick={goUndo}>
            되돌리기
          </S.SecondaryBtn>
          <S.PrimaryBtn type="button" onClick={goCustomize}>
            커스터마이징
          </S.PrimaryBtn>
        </S.ActionRow>

        <S.SaveBar>
          <S.SaveBtn
            type="button"
            onClick={() => {
              if (!editedUrl) return alert("저장할 이미지가 없어요.");
              const a = document.createElement("a");
              a.href = editedUrl;
              a.download = "beautiq-style.png";
              document.body.appendChild(a);
              a.click();
              a.remove();
            }}
          >
            저장하기
          </S.SaveBtn>
        </S.SaveBar>
      </S.Body>
    </S.Screen>
  );
};

export default StyleResultPage;