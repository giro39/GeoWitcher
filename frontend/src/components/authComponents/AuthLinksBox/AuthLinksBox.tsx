import { Link } from "react-router-dom";
import styles from "./AuthLinksBox.module.scss";

interface AuthLinksBoxProps {
    fields: { name: string; url: string }[];
}

// Component for links to register, forgot password, etc. of authentication pages

const AuthLinksBox: React.FC<AuthLinksBoxProps> = ({ fields }) => {
    return (
        <div className={styles.authLinksBox}>
            {fields.map(field => (
                <Link key={field.name} to={field.url} className={styles.singleLink}>{field.name}</Link>
            ))}
        </div>
    );
};

export default AuthLinksBox;
