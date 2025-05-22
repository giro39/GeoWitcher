const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const checkAuth = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${backendUrl}/authcheck`, {
            credentials: "include",
        });
        return res.ok;
    } catch {
        return false;
    }
}