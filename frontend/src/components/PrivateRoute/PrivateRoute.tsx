import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<null | boolean>(null)

    useEffect(() => {
        fetch("http://localhost:3000/authcheck", {
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