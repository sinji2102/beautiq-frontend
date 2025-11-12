import Header from "@components/commons/header/Header";

import UploadImage from "./component/UploadImage/UploadImage";

const SkinAnalysisPage = () => {
  return (
    <>
      <Header text="피부 분석" right="close" />
      <UploadImage />
    </>
  );
};

export default SkinAnalysisPage;
