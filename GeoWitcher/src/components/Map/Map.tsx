import React from "react";
import styles from "./Map.module.scss";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    return (
        <div className={styles.mapContainer}>
            <p>Skibidi</p>
            {Array.from({ length: rows }).map((_, row) => (
                <div key={row} className={styles.row}>
                    {Array.from({ length: cols }).map((_, col) => (
                        <img key={col} src={`/maps/${location}/${row}/${col}.png`} alt="" className={styles.mapTile} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Map;