import "./App.css";

import { Global, ThemeProvider } from "@emotion/react";
import router from "@routes/Router";
import { globalStyles } from "@styles/global";
import { theme, type ThemeType } from "@styles/theme";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={(theme) => globalStyles(theme as ThemeType)} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
