import React, { useCallback, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { MdArrowOutward } from "react-icons/md";
import { TiPin } from "react-icons/ti";

import Marker from "../Marker/Marker";

import styles from "./Map.module.scss";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

type MapSize = "small" | "medium" | "large";

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    const [coordinates, setCoordinates] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [guessed, setGuessed] = useState<boolean>(false);
    const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
    const [mapSize, setMapSize] = useState<MapSize>("small");

    let visibilityTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleMouseEnter = () => {
        if (visibilityTimeout) {
            clearTimeout(visibilityTimeout);
        }
        setIsMapVisible(true);
    };

    const handleMouseLeave = () => {
        visibilityTimeout = setTimeout(() => {
            setIsMapVisible(false);
        }, 1000);
    };

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
    const handleGuess = useCallback(() => {
        if (coordinates && !guessed) {
            console.log("Guess submitted at:", coordinates);
            setGuessed(true);
        }
    }, [coordinates, guessed]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space" && coordinates) {
                handleGuess();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [coordinates, handleGuess]);

    // Returned TSX
    return (
        <div>
            <div
                className={`${styles.container} ${
                    isMapVisible ? styles.visible : styles.hidden
                } ${styles[mapSize]}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <TransformWrapper maxScale={2.5} minScale={0.5} centerOnInit>
                    <TransformComponent
                        wrapperStyle={{ width: "100%", height: "100%" }}
                    >
                        <div
                            className={styles.mapWrapper}
                            onClick={handleClick}
                        >
                            {Array.from({ length: rows }).map((_, row) => (
                                <div key={row} className={styles.row}>
                                    {Array.from({ length: cols }).map(
                                        (_, col) => (
                                            <img
                                                key={col}
                                                src={`/maps/${location}/${row}/${col}.png`}
                                                alt=""
                                                className={styles.tile}
                                            />
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                        {coordinates && (
                            <Marker x={coordinates.x} y={coordinates.y} />
                        )}
                    </TransformComponent>
                </TransformWrapper>
                <button
                    onClick={handleGuess}
                    className={`${styles.button} ${
                        coordinates ? styles.active : ""
                    } `}
                >
                    {!coordinates ? "PLACE YOUR PIN ON THE MAP" : "GUESS"}
                </button>
                <p>
                    {/* Percentage: X={coordinates?.x}%, Y={coordinates?.y}% */}
                </p>
            </div>
        </div>
    );
};

export default Map;
