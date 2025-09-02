import Apage from "@pages/Apage/Apage";
import BPage from "@pages/BPage/BPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apage />} />
        <Route path="/b" element={<BPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
