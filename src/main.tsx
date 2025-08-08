import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/Router";
import "./index.css";
import { Global } from "@emotion/react";
import { globalStyles } from "./styles/global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <AppRouter />
  </React.StrictMode>
);
