import Layout from "@components/commons/layout/Layout";
import DetailPage from "@pages/detailPage/DetailPage";
import EditProfile from "@pages/EditProfile/EditProfile";
import HomePage from "@pages/home/HomePage";
import LoginPage from "@pages/login/Login";
import MyPage from "@pages/my/MyPage";
import RecommendProductPage from "@pages/recommendProduct/RecommendProduct";
import RecommendStylePage from "@pages/RecommendStyle/RecommendStylePage";
import SkinAnalysisLoadingPage from "@pages/skinAnalysis/SkinAnalysisLoadingPage";
import SkinAnalysisPage from "@pages/skinAnalysis/SkinAnalysisPage";
import StyleCustomizingPage from "@pages/styleCustomizing/StyleCustomizingPage";
import ChooseAIStylePage from "@pages/stylePage/ChooseAIStylePage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
import StyleRecommendLoadingPage from "@pages/stylePage/StyleRecommendLoadingPage";
import StyleResultPage from "@pages/styleResult/StyleResultPage";
import TrackingPage from "@pages/tracking/TrackingPage";
import WishListPage from "@pages/wishList/WishList";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "my", element: <MyPage /> },
      { path: "my/edit", element: <EditProfile /> },
      { path: "my/recommend-style", element: <RecommendStylePage /> },
      { path: "my/wishlist/:analysisId", element: <WishListPage /> },
      { path: "style/recommend", element: <StyleRecommandPage /> },
      { path: "detail", element: <DetailPage /> },
      { path: "tracking", element: <TrackingPage /> },
      { path: "detail/recommend-product/:analysisId", element: <RecommendProductPage /> },
      { path: "style/ai", element: <ChooseAIStylePage /> },
      { path: "style/loading", element: <StyleRecommendLoadingPage /> },
      { path: "detail/recommend-product/:analysisId", element: <RecommendProductPage /> },
      { path: "skinAnalysis", element: <SkinAnalysisPage /> },
      { path: "skinAnalysis/loading", element: <SkinAnalysisLoadingPage /> },
      { path: "styleResult", element: <StyleResultPage /> },
      { path: "style/customizing", element: <StyleCustomizingPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
