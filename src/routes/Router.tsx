import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Apage from '../pages/Apage/Apage'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter