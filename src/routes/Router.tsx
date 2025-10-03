import Layout from "@components/commons/layout/Layout";
import EditProfile from "@pages/EditProfile/EditProfile";
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
      { path: "/my/edit", element: <EditProfile /> },
    ],
  },
]);

export default router;
