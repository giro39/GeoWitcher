import React from "react";
import styles from "./LocationImage.module.scss";

interface LocationImageProps {
    imageUrl: string;
}

const LocationImage: React.FC<LocationImageProps> = ({ imageUrl }) => {
    return (
        <div className={styles.imageContainer}>
            <img src={imageUrl} alt="Location photo" className={styles.locationImage} />
        </div>
    );
};

export default LocationImage;
