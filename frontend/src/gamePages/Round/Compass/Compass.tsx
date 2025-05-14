import React from "react";

import styles from "./Compass.module.scss";

interface CompassProps {
    offset: number;
}

const Compass: React.FC<CompassProps> = ({ offset }) => {
    return (
        <div className={styles.container}>
            <img
                src="/utils/compass.png"
                className={styles.image}
                style={{ transform: `rotate(${offset}deg)` }}
            />
        </div>
    )
};

export default Compass;