import Layout from "@components/commons/layout/Layout";
import EditProfile from "@pages/EditProfile/EditProfile";
import HomePage from "@pages/home/HomePage";
import MyPage from "@pages/my/MyPage";
import RecommendStylePage from "@pages/RecommendStyle/RecommendStylePage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
import StyleResultPage from "@pages/styleResult/StyleResultPage";
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
      { path: "tracking", element: <TrackingPage /> },
      { path: "styleResult", element: <StyleResultPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
