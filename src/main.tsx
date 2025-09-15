import "./index.css";

import Modal from "@components/commons/modal/Modal";
import { Global, ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./routes/Router";
import { globalStyles } from "./styles/global";
import { theme, type ThemeType } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={(theme) => globalStyles(theme as ThemeType)} />
      <Modal />
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
