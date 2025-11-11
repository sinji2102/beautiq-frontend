import Layout from "@components/commons/layout/Layout";
import DetailPage from "@pages/detailPage/DetailPage";
import EditProfile from "@pages/EditProfile/EditProfile";
import HomePage from "@pages/home/HomePage";
import MyPage from "@pages/my/MyPage";
import RecommendStylePage from "@pages/RecommendStyle/RecommendStylePage";
import ChooseAIStylePage from "@pages/stylePage/ChooseAIStylePage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
import StyleRecommendLoadingPage from "@pages/stylePage/StyleRecommendLoadingPage";
import TrackingPage from "@pages/tracking/TrackingPage";
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
      { path: "my/recommend-style", element: <RecommendStylePage /> },
      { path: "style/recommend", element: <StyleRecommandPage /> },
      { path: "/detailPage", element: <DetailPage /> },
      { path: "tracking", element: <TrackingPage /> },
      { path: "style/ai", element: <ChooseAIStylePage /> },
      { path: "style/loading", element: <StyleRecommendLoadingPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
