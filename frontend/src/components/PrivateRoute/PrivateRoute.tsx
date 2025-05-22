import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { checkAuth } from "../../utils/checkAuth";


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<null | boolean>(null);

    useEffect(() => {
        checkAuth().then((auth) => {
            setIsAuth(auth);
        })
    }, []);


    if (isAuth === null) return <div>Loading (loading component incoming)</div>;
    if (!isAuth) return <Navigate to={"/login"} replace />
    return <>{children}</>;
}

export default PrivateRoute;