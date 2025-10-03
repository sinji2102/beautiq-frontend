import Header from "@components/commons/header/Header";
import Sidebar from "@components/commons/sidebar/Sidebar";
import { useState } from "react";

import UserProfile from "./components/UserProfile";
import * as S from "./EditProfile.styled";

const EditProfile = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleClickSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <Header left="beautiq" right="hambuger" handleClickHamburger={handleClickSidebar} />
      <S.EditPageWrapper>
        <UserProfile />
      </S.EditPageWrapper>
      <Sidebar isOpen={sidebar} onClose={handleClickSidebar} />
    </>
  );
};

export default EditProfile;
