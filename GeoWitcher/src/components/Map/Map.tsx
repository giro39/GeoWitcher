import React, { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Marker from "../Marker/Marker";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);


    // Clicking on the map
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const xPercentage = ((event.clientX - rect.left) / rect.width) * 100;
        const yPercentage = ((event.clientY - rect.top) / rect.height) * 100;

        console.log(`Percentage: X=${xPercentage}%, Y=${yPercentage}%`);

        setCoordinates({ x: xPercentage, y: yPercentage });
    };

    // Handle guess section
    const [guessed, setGuessed] = useState<boolean>(false);
    const handleGuess = () => {
        if (coordinates) {
            console.log("Guess submitted at:", coordinates);
            setGuessed(true);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space" && coordinates) {
                handleGuess();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [coordinates]);

    // Returned TSX
    return (
        <div className={styles.container}>
            <TransformWrapper maxScale={2.5} minScale={0.5} centerOnInit>
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%", }}>
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
                        <Marker x={coordinates.x} y={coordinates.y} />
                    )}
                </TransformComponent>
            </TransformWrapper>
            <button onClick={handleGuess} className={`${styles.button} ${coordinates ? styles.active : ""} `}>
                {!coordinates ? "PLACE YOUR PIN ON THE MAP" : "GUESS"}

            </button>
            <p>Percentage: X={coordinates?.x}%, Y={coordinates?.y}%</p>
        </div>
    );
};

export default Map;
