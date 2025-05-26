import styles from "./AuthHeader.module.scss";

interface AuthHeaderProps {
    title: string;
}

// Component for the header of authentication pages

const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
    return (
        <header className={styles.authHeader}>
            <h1 className={styles.authTitle}>{title}</h1>
        </header>
    );
};

export default AuthHeader;
