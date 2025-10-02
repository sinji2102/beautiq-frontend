import { useNavigate } from "react-router-dom";

import * as S from "../header/Header.styled";

interface HeaderProps {
  left?: "beautiq" | "back";
  text?: string;
  right?: "hambuger" | "close";
  handleClickHamburger?: () => void;
}

/**
 * Header 컴포넌트
 * @param {left} left 아이콘 종류 (beautiq, back)
 * @param {text} text 헤더 텍스트
 * @param {right} right 아이콘 종류 (hambuger, close)
 * @returns = Header 컴포넌트
 */
const Header = ({ left, text, right, handleClickHamburger }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  // // sidebar 열리는 함수
  // const handleClickHamburger = () => {
  //   alert("사이드로 연결되는 함수입니다.");
  // };

  // 메인 페이지로 연결되는 함수 (임시)
  const handleClickClose = () => {
    navigate("/");
  };

  return (
    <S.HeaderWrapper>
      {left === "beautiq" ? (
        <S.BeautiqIcon />
      ) : left === "back" ? (
        <S.IconButton onClick={handleClickBack}>
          <S.BackIcon />
        </S.IconButton>
      ) : (
        <S.PlaceholderIcon />
      )}
      {text && <div>{text}</div>}
      {right === "hambuger" ? (
        <S.IconButton onClick={handleClickHamburger}>
          <S.HamburgerIcon />
        </S.IconButton>
      ) : right === "close" ? (
        <S.IconButton onClick={handleClickClose}>
          <S.CloseIcon />
        </S.IconButton>
      ) : (
        <S.PlaceholderIcon />
      )}
    </S.HeaderWrapper>
  );
};

export default Header;
