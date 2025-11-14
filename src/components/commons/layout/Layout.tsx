import { useModal } from "@hooks/useModal";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen } = useModal();

  useEffect(() => {
    const user = localStorage.getItem("user");

    const publicPaths = ["/home", "/login", "/oauth/callback"];

    const isPublic = publicPaths.some((path) => location.pathname.startsWith(path));

    if (!isPublic && !user) {
      modalOpen({
        variant: "primary",
        type: "alert",
        title: "회원만 이용 가능한 기능입니다.",
        okCallback: () => navigate("/login"),
      });
    }
  }, [location.pathname, modalOpen, navigate]);

  return <Outlet />;
};

export default Layout;
