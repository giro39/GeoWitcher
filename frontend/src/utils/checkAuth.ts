const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkAuth = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${backendUrl}/api/auth/authcheck`, {
            credentials: "include",
        });
        const data = await res.json();
        return data.isAuth === true;
    } catch {
        return false;
    }
}