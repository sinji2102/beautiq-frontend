import * as S from "../header/Header.styled";

interface HeaderProps {
  left ?: "beautiq" | "back";
  text?:string;
  right?: "hambuger" | "close";
}

const Header = ({left, text, right} : HeaderProps) => {
  return(
    <S.HeaderWrapper>
      {left === "beautiq" ? <S.BeautiqIcon/> : left === "back" ? <S.BackIcon/> : <S.PlaceholderIcon/>}
      {text && <div>{text}</div>}
      {right === "hambuger" ? <S.HamburgerIcon/> : right === "close" ? <S.CloseIcon/> : <S.PlaceholderIcon/>}
    </S.HeaderWrapper>
  );
}

export default Header;