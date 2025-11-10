import Layout from "@components/commons/layout/Layout";
import EditProfile from "@pages/EditProfile/EditProfile";
import HomePage from "@pages/home/HomePage";
import MyPage from "@pages/my/MyPage";
import RecommendProductPage from "@pages/recommendProduct/RecommendProduct";
import RecommendStylePage from "@pages/RecommendStyle/RecommendStylePage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
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
      { path: "my", element: <MyPage /> },
      { path: "my/edit", element: <EditProfile /> },
      { path: "my/recommend-style", element: <RecommendStylePage /> },
      { path: "my/wishlist/:analysisId", element: <WishListPage /> },
      { path: "style/recommend", element: <StyleRecommandPage /> },
      { path: "tracking", element: <TrackingPage /> },
      { path: "detail/recommend-product/:analysisId", element: <RecommendProductPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
