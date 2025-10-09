import React from "react";

import * as S from "./KeywordPicker.styled";

export type KeywordPickerProps = {
  all: string[];
  selected: string[];
  max: number;
  onToggle: (kw: string) => void;
};

const KeywordPicker: React.FC<KeywordPickerProps> = ({
  all,
  selected,
  max,
  onToggle,
}) => {
  // 피그마 기준 기본 13개를 4-4-3-2로 분할
  const base = all.slice(0, 13);
  const rows = [
    base.slice(0, 4),   // 1줄: 4개
    base.slice(4, 8),   // 2줄: 4개
    base.slice(8, 11),  // 3줄: 3개
    base.slice(11, 13), // 4줄: 2개
  ];

  // 13개 이후(사용자 추가 키워드)는 추가 행으로 중앙 정렬 + 줄바꿈 허용
  const extras = all.slice(13);

  const renderChip = (kw: string) => {
    const active = selected.includes(kw);
    return (
      <S.Chip
        key={kw}
        type="button"
        active={active}
        aria-pressed={active}
        disabled={!active && selected.length >= max}
        onClick={() => onToggle(kw)}
      >
        <span>{kw}</span>
        {active && <span className="x">×</span>}
      </S.Chip>
    );
  };

  return (
    <S.Wrap>
      <S.Count>현재 선택된 키워드({selected.length}/{max})</S.Count>
      <S.Guide>원하는 스타일의 키워드를 선택하거나 직접 입력해주세요.</S.Guide>

      {/* 피그마처럼 4-4-3-2 줄로 고정 렌더 */}
      {rows.map((items, idx) => (
        <S.Row key={`row-${idx}`}>
          {items.map(renderChip)}
        </S.Row>
      ))}

      {/* 추가 키워드는 중앙 정렬로 이어서 표시 */}
      {extras.length > 0 && <S.ExtraRow>{extras.map(renderChip)}</S.ExtraRow>}

      {/* 선택된 키워드(아래 칩) */}
      {selected.length > 0 && (
        <S.Selected>
          {selected.map((kw) => (
            <S.SelectedChip key={kw} onClick={() => onToggle(kw)}>
              {kw} <span>×</span>
            </S.SelectedChip>
          ))}
        </S.Selected>
      )}
    </S.Wrap>
  );
};

export default KeywordPicker;