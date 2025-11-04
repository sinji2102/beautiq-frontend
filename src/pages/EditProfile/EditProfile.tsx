import Header from "@components/commons/header/Header";
import Sidebar from "@components/commons/sidebar/Sidebar";
import { useState } from "react";

import AccountActions from "./components/AccountActions/AccountActions";
import UserProfile from "./components/UserProfile/UserProfile";
import * as S from "./EditProfile.styled";

const EditProfile = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleClickSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <S.EditPageWrapper>
      <Header left="beautiq" right="hambuger" handleClickHamburger={handleClickSidebar} />
      <S.EditContiner>
        <UserProfile />
        <AccountActions />
      </S.EditContiner>
      <Sidebar isOpen={sidebar} onClose={handleClickSidebar} />
    </S.EditPageWrapper>
  );
};

export default EditProfile;
