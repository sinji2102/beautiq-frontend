import UserProfile from "@pages/EditProfile/components/UserProfile/UserProfile";
import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

import * as S from "./Sidebar.styled";

export interface SidebarProps {
  isOpen: boolean;
  userName?: string;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(isOpen);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setIsLogin(true);
        setUserName(parsed.username || parsed.userName || "사용자");
      } catch (error) {
        console.error("Failed to parse user data", error);
        setIsLogin(false);
        setUserName(null);
      }
    } else {
      setIsLogin(false);
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    navigate("/my");
  };

  return (
    <Fragment>
      <S.SidebarOverlay isOpen={isOpen} onClick={onClose} aria-hidden={!isOpen} />
      <S.SidebarContainer isOpen={isOpen} role="dialog" aria-modal="true" aria-label="메뉴">
        <S.CloseWrapper>
          <S.CloseButton aria-label="닫기" onClick={onClose}>
            <S.CloseIcon />
          </S.CloseButton>
        </S.CloseWrapper>

        <S.BeautiqHeader>
          <div className="brand">
            <S.LogoIcon />
            <span className="logo">Beautiq</span>
          </div>
        </S.BeautiqHeader>

        <S.DividerSpace />

        <S.NavList>
          <S.NavButton>
            <S.LotionIcon />
            <span onClick={() => (isLogin ? navigate("/skinAnalysis") : navigate("/login"))}>
              피부 분석
            </span>
          </S.NavButton>
          <S.NavButton>
            <S.LipstickIcon />
            <span onClick={() => (isLogin ? navigate("/style/recommend") : navigate("/login"))}>
              메이크업 추천
            </span>
          </S.NavButton>

          {isLogin && (
            <Fragment>
              <S.DividerSpace />
              <S.NavButton>
                <S.HistoryIcon />
                <span onClick={() => navigate("/tracking")}>히스토리</span>
              </S.NavButton>
              <S.NavButton>
                <S.MyIcon />
                <span onClick={() => navigate("/my")}>마이 페이지</span>
              </S.NavButton>
            </Fragment>
          )}
        </S.NavList>

        <S.UserArea>
          {/* <S.UserBadge /> */}
          <S.ProfileImage src={previewUrl || defaultImageUrl} alt="프로필 이미지" />
          {isLogin ? (
            <S.UserButton className="loggedIn" onClick={handleLogoutClick}>
              {userName || "사용자"}
            </S.UserButton>
          ) : (
            <S.UserButton onClick={handleLoginClick}>로그인하기</S.UserButton>
          )}
        </S.UserArea>
      </S.SidebarContainer>
    </Fragment>
  );
};

export default Sidebar;
