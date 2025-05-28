import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Form from "../../../components/authComponents/Form/Form";
import AuthHeader from "../../../components/authComponents/AuthHeader/AuthHeader";
import AuthInfoBox from "../../../components/authComponents/authInfoBox/AuthInfoBox";
import AuthLinksBox from "../../../components/authComponents/AuthLinksBox/AuthLinksBox";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ResetPasswordPage: React.FC = () => {
    const [params] = useSearchParams();
    const [message, setMessage] = useState<string | null>(null);

    const token = params.get("token");

    const handleReset = async (values: Record<string, string>) => {
        setMessage(null);

        try {
            const res = await fetch(`${backendUrl}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password: values.password }),
            });
            const data = await res.json();
            setMessage(data.message || data.error || "Something went wrong.");
        } catch {
            setMessage("Something went wrong.");
        }
    }

    if (!token) return <div>Invalid or missing token.</div>;
    
    return (
        <div>
            <AuthHeader 
                title="Reset Password" 
            />
            <Form
                fields={[{ name: "password", label: "New password", type: "password" }]}
                onSubmit={handleReset}
                submitLabel="Reset password"
            />
            {message && <AuthInfoBox message={message} />}
            <AuthLinksBox 
                fields={[
                    { name: "Back to login", url: "/login" },
                ]}
            />
        </div>
    )

};

export default ResetPasswordPage;