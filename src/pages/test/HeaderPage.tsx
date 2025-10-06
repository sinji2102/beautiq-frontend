import { Fragment } from "react/jsx-runtime";

import Header from "../../components/commons/header/Header";

function Headerpage() {
  return (
    // return문 안에는 태그 2개 반환 못해서 div로 감싸줘야함
    <Fragment>
      <Header left="beautiq" right="hambuger" />
      <Header text="텍스트" right="hambuger" />
      <Header text="텍스트" right="close" />
      <Header left="back" text="텍스트" />
      <Header left="back" text="텍스트" right="close" />
      <Header right="hambuger" />
      <Header right="close" />
      <Header left="back" />
      <Header left="back" right="close" />
    </Fragment>
  );
}

export default Headerpage;
