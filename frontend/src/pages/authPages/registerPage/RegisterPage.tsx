import React, { useState } from "react";
import Form from "../../../components/Form/Form";

import styles from "./RegisterPage.module.scss";

const RegisterPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    const handleRegister = async (values: Record<string, string>) => {
        setMessage(null);
        try {
            const res = await fetch("http://localhost:3000/register", {
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

    return (
        <div className={styles.registerContainer}>
            <h2>Register</h2>
            <Form
                fields={[
                    { name: "email", label: "E-mail", type: "email" },
                    { name: "username", label: "Username", type: "text" },
                    { name: "password", label: "Password", type: "password" },
                ]}
                onSubmit={handleRegister}
                submitLabel="Register"
            />
            {message && <div>{message}</div>}
        </div>
    )
}

export default RegisterPage;