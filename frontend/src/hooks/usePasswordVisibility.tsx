import { CSSProperties, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const eyeIcon = showPassword ? <FaRegEye /> : <FaRegEyeSlash />;
    const inputType = showPassword ? "text" : "password";
    const ariaLabel = showPassword ? "Hide password" : "Show password";

    const buttonStyles: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
    };

    return {
        showPassword,
        togglePasswordVisibility,
        eyeIcon,
        inputType,
        ariaLabel,
        buttonStyles
    };
};