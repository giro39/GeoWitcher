import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Website Pages
import Main from "./pages/websitePages/Main/Main";

// import Map from './components/Map/Map'
// import Round from './pages/gamePages/Round/Round';

// Auth pages
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RegisterPage from './pages/authPages/registerPage/RegisterPage';
import LoginPage from './pages/authPages/loginPage/LoginPage';
import ForgotPasswordPage from "./pages/authPages/forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authPages/resetPasswordPage/ResetPasswordPage";

// Website pages
import About from "./pages/websitePages/About/About";
import Profile from "./pages/websitePages/Profile/Profile";
import Singleplayer from "./pages/websitePages/Singleplayer/Singleplayer";
import Duel from "./pages/websitePages/Duel/Duel";


import './App.scss'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />}/>
                <Route path="reset-password" element={<ResetPasswordPage />}/>
                <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/singleplayer" element={<PrivateRoute><Singleplayer /></PrivateRoute>} />
                <Route path="/duel" element={<PrivateRoute><Duel /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default App
