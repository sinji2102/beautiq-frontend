import Layout from "@components/commons/layout/Layout";
import HomePage from "@pages/home/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,
    children: [{ path: "/home", element: <HomePage /> }],
  },
]);

export default router;
