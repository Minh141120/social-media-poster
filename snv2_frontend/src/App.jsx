import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import UserHomePage from './pages/UserHomePage/UserHomePage'
import LoginPage from "./pages/LoginPage/LoginPage"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/userhomepage/:id" exact element={<UserHomePage/>} />
          {/* <Route path="/userhomepage/:id" exact element={<UserHomePage/>} /> */}
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App