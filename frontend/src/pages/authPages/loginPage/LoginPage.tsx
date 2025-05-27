import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuth } from "../../../store/authSlice";
import { checkAuth } from "../../../utils/checkAuth";

import Form from "../../../components/authComponents/Form/Form";
import AuthHeader from "../../../components/authComponents/AuthHeader/AuthHeader";
import AuthInfoBox from "../../../components/authComponents/authInfoBox/AuthInfoBox";
import AuthLinksBox from "../../../components/authComponents/AuthLinksBox/AuthLinksBox";
import AlreadyLoggedInPage from "../alreadyLoggedInPage/AlreadyLoggedInPage";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";

import styles from "./LoginPage.module.scss";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth().then((auth) => {
            dispatch(setAuth(auth));
            setLoading(false);
        })
    }, [])

    const handleLogin = async (values: Record<string, string>) => {
        setMessage(null);

        const loginValue = values.login;
        const payload: Record<string, string> = { password: values.password };
        if (loginValue.includes("@")) {
            payload.email = loginValue;
        } else {
            payload.username = loginValue;
        }

        try {
            const res = await fetch(`${backendUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setAuth(true));
            } else {
                setMessage(data.error || "Login failed.");
                dispatch(setAuth(false));
            }
        } catch {
            setMessage("Some error occured.");
            dispatch(setAuth(false));
        }
    };
    
    if (loading) return <LoadingIcon />;
    if (isAuth) return <AlreadyLoggedInPage />;
    return (
        <div className={styles.loginContainer}>
            <AuthHeader 
                title="Login" 
            />
            <Form 
                fields={[
                    { name: "login", label: "Username or email", type: "text" },
                    { name: "password", label: "Password", type: "password" },
                ]}
                onSubmit={handleLogin}
                submitLabel="Login"
            />
            <AuthLinksBox
                fields={[
                    { name: "Forgot password?", url: "/forgot-password" },
                    { name: "Don't have an account? Register here", url: "/register" },
                ]}
            />
            {message && <AuthInfoBox message={message} />}
        </div>
    );
};

export default LoginPage;