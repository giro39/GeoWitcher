import styles from "./AuthInfoBox.module.scss";

interface AuthInfoBoxProps {
    message: string;
}

// Component for the message box of authentication pages

const AuthInfoBox: React.FC<AuthInfoBoxProps> = ({ message }) => {
    return (
        <div className={styles.authInfoBox}>
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default AuthInfoBox;
