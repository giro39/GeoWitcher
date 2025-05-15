import { useState } from "react"
import Form from "../../../components/Form/Form";


const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async (values: Record<string, string>) => {
        setMessage(null);
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
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
        <div>
            <h2>Login</h2>
            <Form 
                fields={[
                    { name: "email", label: "Email", type: "email" },
                    { name: "username", label: "Username", type: "text" },
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