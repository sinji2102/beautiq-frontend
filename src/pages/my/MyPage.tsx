import Header from "@components/commons/header/Header";
import Sidebar from "@components/commons/sidebar/Sidebar";
import { useState } from "react";

import { MenuItem } from "./components/MenuItem/MenuItem";
import UserProfile from "./components/UserProfile/UserProfile";
import * as S from "./MyPage.styled";

const MyPage = () => {
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
          <MenuItem title="개인정보 수정" />
          <MenuItem title="서비스 정보" />
        </S.MenuSection>

        <S.Divider />

        <S.MenuSection>
          <MenuItem title="피부 분석 히스토리" />
          <MenuItem title="추천 스타일 확인" />
          <MenuItem title="찜한 제품 확인" />
        </S.MenuSection>

        <S.Divider />

        <S.MenuSection>
          <MenuItem title="이용 약관" />
          <MenuItem title="개인정보 처리방침" />
        </S.MenuSection>
      </S.MyPageWrapper>

      <Sidebar isOpen={sidebar} onClose={handleClickSidebar} />
    </>
  );
};

export default MyPage;
