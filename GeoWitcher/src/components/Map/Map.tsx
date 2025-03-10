import React, { useState } from "react";
// import styles from "./Map.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const xPercentage = ((event.clientX - rect.left) / rect.width) * 100;
        const yPercentage = ((event.clientY - rect.top) / rect.height) * 100;

        const tileWidth = rect.width / cols;
        const tileHeight = rect.height / rows;
        const col = Math.floor((event.clientX - rect.left) / tileWidth);
        const row = Math.floor((event.clientY - rect.top) / tileHeight);

        console.log(`Clicked on tile: row ${row}, col ${col}`);
        console.log(`Percentage: X=${xPercentage}%, Y=${yPercentage}%`);

        setCoordinates({ x: xPercentage, y: yPercentage });
    };

    return (
        <TransformWrapper>
            <TransformComponent>
                <div style={{ display: "flex", flexDirection: "column" }} onClick={handleClick}>
                    {Array.from({ length: rows }).map((_, row) => (
                        <div key={row} style={{ display: "flex" }}>
                            {Array.from({ length: cols }).map((_, col) => (
                                <img
                                    key={col}
                                    src={`/maps/${location}/${row}/${col}.png`}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <p>
                        Percentage: X: {coordinates.x}%, Y: {coordinates.y}%
                    </p>
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
};

export default Map;
