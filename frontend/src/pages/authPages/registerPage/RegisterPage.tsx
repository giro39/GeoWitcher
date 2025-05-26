import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuth } from "../../../store/authSlice";
import { checkAuth } from "../../../utils/checkAuth";

import Form from "../../../components/authComponents/Form/Form";
import AuthHeader from "../../../components/authComponents/AuthHeader/AuthHeader";
import AuthInfoBox from "../../../components/authComponents/authInfoBox/AuthInfoBox";
import AlreadyLoggedInPage from "../alreadyLoggedInPage/AlreadyLoggedInPage";

import styles from "./RegisterPage.module.scss";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RegisterPage: React.FC = () => {
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

    const handleRegister = async (values: Record<string, string>) => {
        setMessage(null);
        try {
            const res = await fetch(`${backendUrl}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Registration succesful! You can log in now.");
            } else {
                setMessage(data.error || "Registration failed.");
            }
        } catch {
            setMessage("Some error occured.");
        }
    };

    if (loading) return <div>Loading...</div>
    if (isAuth) return <AlreadyLoggedInPage />
    return (
        <div className={styles.registerContainer}>
            <AuthHeader 
                title="Register" 
            />
            <Form
                fields={[
                    { name: "email", label: "E-mail", type: "email" },
                    { name: "username", label: "Username", type: "text" },
                    { name: "password", label: "Password", type: "password" },
                ]}
                onSubmit={handleRegister}
                submitLabel="Register"
            />
            {message && <AuthInfoBox message={message} />}
        </div>
    )
}

export default RegisterPage;