import Layout from "@components/commons/layout/Layout";
import HomePage from "@pages/home/HomePage";
import DetailPage from "@pages/tracking/components/detailPage/DetailPage";
import TrackingPage from "@pages/tracking/TrackingPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/tracking", element: <TrackingPage /> },
      { path: "/detailPage", element: <DetailPage /> },
    ],
  },
]);

export default router;
