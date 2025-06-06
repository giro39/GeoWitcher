import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuth } from "../../../store/authSlice";
import { checkAuth } from "../../../utils/checkAuth";

import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility"; 

import Form from "../../../components/authComponents/Form/Form";
import AuthHeader from "../../../components/authComponents/AuthHeader/AuthHeader";
import AuthInfoBox from "../../../components/authComponents/AuthInfoBox/AuthInfoBox";
import AuthLinksBox from "../../../components/authComponents/AuthLinksBox/AuthLinksBox";
import AlreadyLoggedInPage from "../alreadyLoggedInPage/AlreadyLoggedInPage";

import styles from "./RegisterPage.module.scss";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { togglePasswordVisibility, eyeIcon, inputType, ariaLabel, buttonStyles } = usePasswordVisibility();

    useEffect(() => {
        checkAuth().then((auth) => {
            dispatch(setAuth(auth));
            setLoading(false);
        })
    }, []);


    const validateForm = (values: Record<string, string>) => {
        const validationErrors: string[] = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            validationErrors.push("Please enter a valid email address.")
        }

        const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
        if (!usernameRegex.test(values.username)) {
            validationErrors.push("Username must be 3-20 characters and contain only letters, numbers, and underscores.")
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(values.password)) {
            validationErrors.push("Password must be at least 8 characters long, include uppercase, lowercase, and a number.")
        }

        return validationErrors;
    }

    const handleRegister = async (values: Record<string, string>) => {
        setMessage(null);

        const validationErrors = validateForm(values);
        if (validationErrors.length > 0) {
            setMessage(validationErrors.join(" "));
            return;
        }

        try {
            const res = await fetch(`${backendUrl}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Registration succesful! You can log in after verifying your email.");
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
                    { name: "password", label: "Password", type: inputType,
                        endAdornment: (
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className={styles.passwordToggle}
                                style={buttonStyles}
                                aria-label={ariaLabel}
                            >
                                {eyeIcon}
                            </button>
                        )
                    },
                ]}
                onSubmit={handleRegister}
                submitLabel="Register"
            />
            <AuthLinksBox
                fields={[
                    { name: "Already have an account? Log in here", url: "/login" },
                ]}
            />
            {message && <AuthInfoBox message={message} />}
        </div>
    )
}

export default RegisterPage;