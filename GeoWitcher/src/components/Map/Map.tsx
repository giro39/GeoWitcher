import React, { useState } from "react";
import styles from "./Map.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const xPercentage = ((event.clientX - rect.left) / rect.width) * 100;
        const yPercentage = ((event.clientY - rect.top) / rect.height) * 100;

        // const tileWidth = rect.width / cols;
        // const tileHeight = rect.height / rows;
        // const col = Math.floor((event.clientX - rect.left) / tileWidth);
        // const row = Math.floor((event.clientY - rect.top) / tileHeight);

        // console.log(`Clicked on tile: row ${row}, col ${col}`);
        console.log(`Percentage: X=${xPercentage}%, Y=${yPercentage}%`);

        setCoordinates({ x: xPercentage, y: yPercentage });
    };

    return (
        <div className={styles.container}>
            {/* <div>
                <p>
                    {coordinates && `Percentage: X: ${coordinates.x}%, Y: ${coordinates.y}%`}
                </p>
            </div> */}
            <TransformWrapper
                maxScale={2.5}
                minScale={0.5}
                centerOnInit
            >
                <TransformComponent
                    wrapperStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div className={styles.mapWrapper} onClick={handleClick}>
                        {Array.from({ length: rows }).map((_, row) => (
                            <div key={row} className={styles.row}>
                                {Array.from({ length: cols }).map((_, col) => (
                                    <img
                                        key={col}
                                        src={`/maps/${location}/${row}/${col}.png`}
                                        alt=""
                                        className={styles.tile}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    {coordinates && (
                        <div
                            className={styles.marker}
                            style={{
                                left: `${coordinates.x}%`,
                                top: `${coordinates.y}%`,
                            }}
                        />
                    )}
                </TransformComponent>
            </TransformWrapper>
            <button className={`${styles.button} ${coordinates ? styles.active : ""} `}>
                {!coordinates ? "PLACE YOUR PIN ON THE MAP" : "GUESS"}
            </button>
        </div>
    );
};

export default Map;
