import { AppDispatch } from "../store";
import { setAuth } from "../store/authSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleLogout = async (dispatch: AppDispatch) => {
    await fetch(`${backendUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
    });
    dispatch(setAuth(false));
}