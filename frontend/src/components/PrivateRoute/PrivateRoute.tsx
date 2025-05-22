import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<null | boolean>(null)

    useEffect(() => {
        fetch(`${backendUrl}/authcheck`, {
            credentials: "include",
        })
        .then(res => setIsAuth(res.ok))
        .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <div>Loading (loading component incoming)</div>;
    if (!isAuth) return <Navigate to={"/login"} replace />
    return <>{children}</>;
}

export default PrivateRoute;