import {
  type MakeupRecommendationRequest,
  postMakeupRecommendation,
} from "@apis/domain/makeup/api";
import Button from "@components/commons/button/Button";
import Header from "@components/commons/header/Header";
import type { StyleContentsProps } from "@pages/stylePage/types";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import KeywordPicker from "./components/KeywordPicker/KeywordPicker";
import Loading from "./components/Loading/Loading";
import UploadImage from "./components/UploadImage/UploadImage";
import * as S from "./StyleRecommandPage.styled";

const ALL_KEYWORDS = [
  "사랑스러운",
  "청순",
  "핑크블러셔",
  "피치블러셔",
  "오렌지블러셔",
  "매트립(광택없는)",
  "핑크립",
  "오렌지립",
  "웜톤",
  "쿨톤",
  "투명피부",
  "매트피부",
  "물광피부",
  "진한눈썹",
  "세미스모키",
  "자연스러운눈썹",
] as const;

const MAX = 5;
const normalize = (s: string) => s.trim();

const StyleRecommandPage: React.FC = () => {
  const navigate = useNavigate();

  const [contents, setContents] = useState<StyleContentsProps[]>([
    { itemId: 0 } as unknown as StyleContentsProps,
  ]);
  const [isLoading, setLoading] = useState(false);

  const [all] = useState<string[]>([...ALL_KEYWORDS]);
  const [selected, setSelected] = useState<string[]>([]);
  const [styleValue, setstyleValue] = useState("");

  const toggleKeyword = (kw: string) => {
    const k = normalize(kw);
    setSelected((prev) =>
      prev.includes(k) ? prev.filter((v) => v !== k) : prev.length >= MAX ? prev : [...prev, k]
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

  const hasAnyImage = useMemo(() => contents.some((c) => Boolean(c.itemImage)), [contents]);

  const canNext = useMemo(
    () => hasAnyImage || selected.length > 0 || styleValue.trim().length > 0,
    [hasAnyImage, selected.length, styleValue]
  );

  const extractFirstFile = (): File | undefined => {
    const first = contents.find((c) => c.itemImage);
    const img: unknown = first && first.itemImage;
    if (img instanceof File) return img;
    return undefined;
  };

  const handleNextBtn = async () => {
    const imageFile = extractFirstFile();
    if (!imageFile) {
      alert("이미지를 선택해 주세요.");
      return;
    }

    const params: MakeupRecommendationRequest = {
      keywords: selected,
    } as unknown as MakeupRecommendationRequest;

    try {
      setLoading(true);

      const res = await postMakeupRecommendation(imageFile, params);

      localStorage.setItem("keywords", JSON.stringify(selected));
      if (!res) {
        alert("추천을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }

      // 🔥 응답에서 안전하게 추천 리스트 꺼내기
      const resultData = Array.isArray(res.recommendations) ? res.recommendations : [];

      navigate("/style/ai", {
        state: {
          recommendData: resultData,
        },
      });
    } catch (e) {
      console.error(e);
      alert("요청 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <S.Screen>
      <Header text="스타일 추천" right="close" />

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
          <KeywordPicker all={all} selected={selected} max={MAX} onToggle={toggleKeyword} />
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
          <Button size="large" variant="primary" disabled={!canNext} onClick={handleNextBtn}>
            다음으로
          </Button>
        </S.BottomBar>
      </S.Body>
    </S.Screen>
  );
};

export default StyleRecommandPage;
