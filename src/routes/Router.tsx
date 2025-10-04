// src/routes/Router.tsx
import Layout from "@components/commons/layout/Layout";
import HomePage from "@pages/home/HomePage";
import StyleRecommandPage from "@pages/stylePage/StyleRecommandPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "style/recommend", element: <StyleRecommandPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> }, // (옵션) 404 처리
]);

export default router;