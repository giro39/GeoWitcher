import SubpageButton from "../../../components/websiteComponents/SubpageButton/SubpageButton";

import styles from "./Main.module.scss"

const Main: React.FC = () => {
    return (
    <main className={styles.mainContainer}>
        <div className={styles.leftContainer}>
            <SubpageButton 
                text="Welcome to GeoWitcher"
                image="buttonImages/WhiteFrost.png"
                url="about"
            />
            <SubpageButton 
                text="Profile"
                image="buttonImages/ElvenBlade.png"
                url="profile"
            />
        </div>
        <SubpageButton 
            text="Singleplayer"
            image="buttonImages/Milaen.png"
            url="singleplayer"
        />
        <SubpageButton 
            text="Duel"
            image="buttonImages/PrinceAnseis.png"
            url="duel"
        />
    </main>
    );
};

export default Main;
