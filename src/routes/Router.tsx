import Layout from "@components/commons/layout/Layout";
import HomePage from "@pages/home/HomePage";
import MyPage from "@pages/my/MyPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/my", element: <MyPage /> },
    ],
  },
]);

export default router;
