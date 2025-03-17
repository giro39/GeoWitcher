import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./LocationImage.module.scss";

interface LocationImageProps {
    imageUrl: string;
}

const LocationImage: React.FC<LocationImageProps> = ({ imageUrl }) => {
    return (
        <div className={styles.imageContainer}>
            <TransformWrapper>
                <TransformComponent>
                    <img src={imageUrl} alt="Location photo" className={styles.locationImage} />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default LocationImage;
