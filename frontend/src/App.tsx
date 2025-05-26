import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Map from './components/Map/Map'
import Round from './pages/gamePages/Round/Round';

// Auth pages
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RegisterPage from './pages/authPages/registerPage/RegisterPage';
import LoginPage from './pages/authPages/loginPage/LoginPage';
import ForgotPasswordPage from "./pages/authPages/forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authPages/resetPasswordPage/ResetPasswordPage";

import './App.scss'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />}/>
                <Route path="reset-password" element={<ResetPasswordPage />}/>
                <Route path="/" element={<PrivateRoute><Round /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default App
