import Button from "@components/commons/button/Button";
import type { ContentsProps } from "@pages/stylePage/types";
import React, { useMemo, useState } from "react";

import KeywordPicker from "./components/KeywordPicker/KeywordPicker";
import UploadImage from "./components/UploadImage/UploadImage";
import * as S from "./StyleRecommandPage.styled";

const ALL_KEYWORDS = [
  "차분", "청량", "모던", "러블리",
  "청순", "톤온톤", "세련된", "내추럴",
  "꾸안꾸", "트렌디", "파스텔톤",
  "비비드", "모노톤",
] as const;

const MAX = 5;
const normalize = (s: string) => s.trim();

const StyleRecommandPage: React.FC = () => {
  const [contents, setContents] = useState<ContentsProps[]>([
    { itemId: 0 } as unknown as ContentsProps,
  ]);

  const [all] = useState<string[]>([...ALL_KEYWORDS]);
  const [selected, setSelected] = useState<string[]>([]);
  const [styleValue, setstyleValue] = useState("");

  const toggleKeyword = (kw: string) => {
    const k = normalize(kw);
    setSelected((prev) =>
      prev.includes(k) ? prev.filter((v) => v !== k)
        : prev.length >= MAX ? prev : [...prev, k]
    );
  };

  const addFromInput = () => {
    const k = normalize(styleValue);
    if (!k) return;
    if (selected.length >= MAX) return;
    setSelected((prev) => (prev.includes(k) ? prev : [...prev, k]));
    setstyleValue("");
  };

  const onCustomKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if ((e.key === "Enter" || e.key === ",") && styleValue.trim()) {
      e.preventDefault();
      addFromInput();
    }
  };

  const hasAnyImage = useMemo(
    () => contents.some((c) => Boolean(c.itemImage)),
    [contents]
  );

  const canNext = useMemo(
    () => hasAnyImage || selected.length > 0 || styleValue.trim().length > 0,
    [hasAnyImage, selected.length, styleValue]
  );

  return (
    <S.Screen>
      <S.HeaderBar>
        <span className="title">스타일 추천</span>
        <button className="close" type="button" aria-label="닫기">
          {/* ✅ SVG 컴포넌트 사용 */}
          <S.CloseIcon aria-hidden />
        </button>
      </S.HeaderBar>

      <S.Body>
        <S.Card>
          <UploadImage
            contents={contents}
            setContents={setContents}
            itemNumber={0}
            onUseExisting={() => {
              alert("기존 사진 사용하기: 준비 중!");
            }}
          />
        </S.Card>

        <S.Card>
          <KeywordPicker
            all={all}
            selected={selected}
            max={MAX}
            onToggle={toggleKeyword}
          />
        </S.Card>

        <S.InputBlock>
          <S.CustomInput
            placeholder="원하는 스타일을 입력하세요"
            value={styleValue}
            onChange={(e) => setstyleValue(e.target.value)}
            onKeyDown={onCustomKeyDown}
          />
        </S.InputBlock>

        <S.BottomBar>
          <Button
            size="large"
            variant="primary"
            disabled={!canNext}
            onClick={() => alert("다음 단계로 진행!")}
          >
            다음으로
          </Button>
        </S.BottomBar>
      </S.Body>
    </S.Screen>
  );
};

export default StyleRecommandPage;