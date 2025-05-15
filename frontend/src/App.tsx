import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Map from './components/Map/Map'
import Round from './pages/gamePages/Round/Round';

// Auth pages
import RegisterPage from './pages/authPages/registerPage/RegisterPage';
import LoginPage from './pages/authPages/loginPage/LoginPage';

import './App.scss'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Round />} />
            </Routes>
        </Router>
    )
}

export default App
