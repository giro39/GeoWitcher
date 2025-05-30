import SubpageButton from "../../../components/websiteComponents/subpageButton/subpageButton";

import styles from "./Main.module.scss"

const Main: React.FC = () => {
    return (
    <main className={styles.mainContainer}>
        <h1>Main Page</h1>
        <SubpageButton 
            text="Text"
            image="image"
            url="url"
        />
    </main>
    );
};

export default Main;