import Apage from "@pages/Apage/Apage";
import BPage from "@pages/BPage/BPage";
import ButtonTestPage from "@pages/test/ButtonTest";
import ModalTestPage from "@pages/test/ModalTest";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apage />} />
        <Route path="/b" element={<BPage />} />
        <Route path="/button" element={<ButtonTestPage />} />
        <Route path="/modal" element={<ModalTestPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
