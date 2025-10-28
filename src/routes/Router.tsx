import Layout from "@components/commons/layout/Layout";
import EditProfile from "@pages/EditProfile/EditProfile";
import HomePage from "@pages/home/HomePage";
import DetailPage from "@pages/tracking/components/detailPage/DetailPage";
import TrackingPage from "@pages/tracking/TrackingPage";
import MyPage from "@pages/my/MyPage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "my", element: <MyPage /> },
      { path: "my/edit", element: <EditProfile /> },
      { path: "style/recommend", element: <StyleRecommandPage /> },
      { path: "/detailPage", element: <DetailPage /> },
      { path: "tracking", element: <TrackingPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
