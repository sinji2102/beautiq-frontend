import Header from "@components/commons/header/Header";
import Sidebar from "@components/commons/sidebar/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuItem } from "./components/MenuItem/MenuItem";
import UserProfile from "./components/UserProfile/UserProfile";
import * as S from "./MyPage.styled";

const MyPage = () => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const handleClickSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <Header left="beautiq" right="hambuger" handleClickHamburger={handleClickSidebar} />

      <S.MyPageWrapper>
        <UserProfile />
        <S.MenuSection>
          <MenuItem title="개인정보 수정" onClick={() => navigate("/my/edit")} />
          <MenuItem title="서비스 정보" onClick={() => navigate("/my/service")} />
        </S.MenuSection>

        <S.Divider />

        <S.MenuSection>
          <MenuItem title="피부 분석 히스토리" onClick={() => navigate("/tracking")} />
          <MenuItem title="추천 스타일 확인" onClick={() => navigate("/my/style")} />
          <MenuItem title="찜한 제품 확인" onClick={() => navigate("/my/like")} />
        </S.MenuSection>

        <S.Divider />

        <S.MenuSection>
          <MenuItem title="이용 약관" onClick={() => navigate("")} />
          <MenuItem title="개인정보 처리방침" onClick={() => navigate("")} />
        </S.MenuSection>
      </S.MyPageWrapper>

      <Sidebar isOpen={sidebar} onClose={handleClickSidebar} />
    </>
  );
};

export default MyPage;
