import { useState } from "react";
import Form from "../../../components/authComponents/Form/Form";
import AuthHeader from "../../../components/authComponents/AuthHeader/AuthHeader";
import AuthInfoBox from "../../../components/authComponents/authInfoBox/AuthInfoBox";
import AuthLinksBox from "../../../components/authComponents/AuthLinksBox/AuthLinksBox";

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
            <AuthHeader 
                title="Forgot Password" 
            />
            <Form 
                fields={[{ name: "email", label: "E-mail", type: "email" }]}
                onSubmit={handleForgot}
                submitLabel="Send reset link"
            />
            
            {message && <AuthInfoBox message={message} />}

            <AuthLinksBox 
                fields={[
                    { name: "Back to login", url: "/login" },
                ]}
            />
        </div>
    );
};

export default ForgotPasswordPage;