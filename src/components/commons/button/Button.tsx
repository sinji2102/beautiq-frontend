import React, { type ReactNode } from "react";

import * as S from "./Button.styled";

export type ButtonSizeTypes = "xlarge" | "large" | "medium" | "small" | "xsmall";
export type ButtonVariantTypes = "primary" | "line";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizeTypes;
  variant?: ButtonVariantTypes;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  onClick,
  size,
  disabled = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  return (
    <S.ButtonWrapper
      onClick={onClick}
      $size={size}
      disabled={disabled}
      $isDisabled={disabled}
      $variant={variant}
    >
      {children}
    </S.ButtonWrapper>
  );
};

export default Button;
