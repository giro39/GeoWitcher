import { AppDispatch } from "../store";
import { setAuth } from "../store/authSlice";

export const handleLogout = async (dispatch: AppDispatch) => {
    await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include",
    });
    dispatch(setAuth(false));
}