import * as S from "./MenuItem.styled";

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MenuItem = ({ title, ...restProps }: MenuItemProps) => {
  return (
    <S.MenuItemWrapper {...restProps}>
      {title}
      <S.ArrowBtn>
        <S.ArrowIcon />
      </S.ArrowBtn>
    </S.MenuItemWrapper>
  );
};
