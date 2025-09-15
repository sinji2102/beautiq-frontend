import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Apage from "../pages/Apage/Apage";
import BPage from "../pages/BPage/BPage";
import HomeGuest from "../pages/HomeGuest/HomeGuest"; // ✅ 추가
import HomeUser from "../pages/HomeUser/HomeUser";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apage />} />
        <Route path="/b" element={<BPage />} />
        <Route path="/c" element={<HomeGuest />} />
        <Route path="/d" element={<HomeUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
