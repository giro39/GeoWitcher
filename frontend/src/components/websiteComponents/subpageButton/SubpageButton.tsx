import { Link } from "react-router-dom";

import styles from "./SubpageButton.module.scss";

interface SubpageButtonProps {
    text: string,
    image: string,
    url: string,
}

const SubpageButton: React.FC<SubpageButtonProps> = ({ text, image, url }) => {
    return (
    <div className={styles.linkContainer} key={text} style={{ backgroundImage: `url(${image})` }}>
        <Link to={url} className={styles.link}>
            <h3>{text}</h3>
        </Link>
    </div>
  );
};

export default SubpageButton;