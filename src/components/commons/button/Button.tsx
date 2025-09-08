import React, { type ReactNode } from "react";

import * as S from "./Button.styled";

export type ButtonSizeTypes = "xlarge" | "large" | "medium" | "small" | "xsmall";
export type ButtonVariantTypes = "primary" | "line" | "modal";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizeTypes;
  variant?: ButtonVariantTypes;
  isInactive?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * @param {() => void} onClick - 버튼 클릭 시 실행되는 핸들러
 * @param {ButtonSizeTypes} size - 버튼 크기 (xlarge | large | medium | small | xsmall)
 * @param {boolean} disabled- 버튼 비활성화 여부 (기본이 false)
 * @param {boolean} isInactive - 버튼은 클릭 가능하지만, 디자인만 비활성화 스타일로 보여줄지 여부
 * @param {ButtonVariantTypes} variant - 버튼 스타일 종류 (primary - 기본| line)
 * @param {React.ReactNode} children - 버튼 내부에 표시될 콘텐츠 (텍스트/아이콘 등)
 */
const Button = ({
  onClick,
  size,
  disabled = false,
  isInactive = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  const applyDisabledStyle = disabled || isInactive;

  return (
    <S.ButtonWrapper
      onClick={onClick}
      $size={size}
      disabled={disabled}
      $isDisabled={applyDisabledStyle}
      $variant={variant}
    >
      {children}
    </S.ButtonWrapper>
  );
};

export default Button;
