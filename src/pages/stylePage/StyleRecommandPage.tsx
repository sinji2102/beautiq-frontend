import React, { useMemo, useState } from "react";

import KeywordPicker from "./components/KeywordPicker/KeywordPicker";
import UploadImage from "./components/UploadImage/UploadImage";
import * as S from "./StyleRecommandPage.styled";

const ALL_KEYWORDS = [
  "차분", "청량", "모던", "러블리",
  "청순", "톤온톤", "세련된", "내추럴",
  "꾸안꾸", "트렌디", "파스텔톤",
  "비비드", "모노톤",
];

const MAX = 5;

// 간단 정규화(앞뒤 공백 제거)
const normalize = (s: string) => s.trim();

const StyleRecommandPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [all] = useState<string[]>(ALL_KEYWORDS); // ✅ 전체 키워드도 상태로 관리
  const [selected, setSelected] = useState<string[]>([]);
  const [customStyle, setCustomStyle] = useState("");

  // 칩 토글
  const toggleKeyword = (kw: string) => {
    const k = normalize(kw);
    setSelected((prev) =>
      prev.includes(k) ? prev.filter((v) => v !== k)
        : prev.length >= MAX ? prev : [...prev, k]
    );
  };

  // 입력창 → Enter/콤마로 추가 + 즉시 선택
  const addFromInput = () => {
    const k = normalize(customStyle);
    if (!k) return;
    if (selected.length >= MAX) return;

    setSelected((prev) => (prev.includes(k) ? prev : [...prev, k])); // ✅ 곧바로 선택
    setCustomStyle(""); // 입력창 비우기
  };

  const onCustomKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if ((e.key === "Enter" || e.key === ",") && customStyle.trim()) {
      e.preventDefault();
      addFromInput();
    }
  };

  const canNext = useMemo(
    () => !!image || selected.length > 0 || customStyle.trim().length > 0,
    [image, selected.length, customStyle]
  );

  return (
    <S.Screen>
      <S.HeaderBar>
        <span className="title">스타일 추천</span>
        <button className="close" aria-label="닫기">×</button>
      </S.HeaderBar>

      <S.Body>
        <S.Card>
          <UploadImage
            image={image}
            onRemove={() => setImage(null)}
            onPickFile={(file) => setImage(URL.createObjectURL(file))}
          />
        </S.Card>

        <S.Card>
          <KeywordPicker
            all={all}               // ✅ 상태로 관리되는 전체 키워드 전달
            selected={selected}
            max={MAX}
            onToggle={toggleKeyword}
          />
        </S.Card>

        <S.InputBlock>
        
          <input
            id="custom-style"
            placeholder="원하는 스타일을 입력하세요"
            value={customStyle}
            onChange={(e) => setCustomStyle(e.target.value)}
            onKeyDown={onCustomKeyDown}   // ✅ Enter/콤마 처리
          />
        </S.InputBlock>

        <S.BottomBar>
          <button disabled={!canNext} onClick={() => alert("다음 단계로 진행!")}>
            다음으로
          </button>
        </S.BottomBar>
      </S.Body>
    </S.Screen>
  );
};

export default StyleRecommandPage;