import { useState } from "react"
import Form from "../../../components/Form/Form";

import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

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
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Login successful! Token: " + data.token);
            } else {
                setMessage(data.error || "Login failed.");
            }
        } catch {
            setMessage("Some error occured.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <Form 
                fields={[
                    { name: "login", label: "Username or email", type: "text" },
                    { name: "password", label: "Password", type: "password" },
                ]}
                onSubmit={handleLogin}
                submitLabel="Login"
            />
            {message && <div>{message}</div>}
        </div>
    );
};

export default LoginPage;