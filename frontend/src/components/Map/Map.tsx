import React, { useCallback, useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Marker from "../Marker/Marker";
import MapButtons from "./MapButtons/MapButtons";

import styles from "./Map.module.scss";
import { MapSize } from "./mapTypes";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    const [coordinates, setCoordinates] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [guessed, setGuessed] = useState<boolean>(false);
    const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
    const [mapSize, setMapSize] = useState<MapSize>("small");
    const [isPinned, setIsPinned] = useState<boolean>(false);
    const [_, setZoom] = useState<number>(1);
    const transformWrapperRef = useRef<any>(null);

    // Visibility of the map
    let visibilityTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleMouseEnter = () => {
        if (visibilityTimeout) {
            clearTimeout(visibilityTimeout);
        }
        if (!isPinned) {
            setIsMapVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isPinned) {
            visibilityTimeout = setTimeout(() => {
                setIsMapVisible(false);
            }, 800);
        }
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
                <MapButtons
                    mapSize={mapSize}
                    setMapSize={setMapSize}
                    transformWrapperRef={transformWrapperRef}
                    isPinned={isPinned}
                    setIsPinned={setIsPinned}
                />
                <TransformWrapper
                    maxScale={3.5}
                    minScale={0.5}
                    centerOnInit
                    onZoom={(zoomData) => {
                        setZoom(zoomData.state.scale);
                    }}
                    ref={transformWrapperRef}
                >
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
                            <Marker x={coordinates.x} y={coordinates.y} /> // as i have zoom state now, probably i can alter the size of the marker
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
