import { useState } from "react";
import Form from "../../../components/Form/Form";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ForgotPasswordPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    const handleForgot = async (values: Record<string, string>) => {
        setMessage(null);
        try {
            const res = await fetch(`${backendUrl}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email }),
            });
            const data = await res.json();
            setMessage(data.message || "Check your email for reset instructions.");
        } catch {
            setMessage("Something went wrong.");
        };
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <Form 
                fields={[{ name: "email", label: "E-mail", type: "email" }]}
                onSubmit={handleForgot}
                submitLabel="Send reset link"
            />
            {message && <div>{message}</div>}
        </div>
    );
};

export default ForgotPasswordPage;