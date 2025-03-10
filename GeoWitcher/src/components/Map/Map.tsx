
import styles from "./Map.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MapProps {
    location: string;
    rows: number;
    cols: number;
}

const Map: React.FC<MapProps> = ({ location, rows, cols }) => {
    return (
        <TransformWrapper>
            <TransformComponent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {Array.from({ length: rows }).map((_, row) => (
                        <div key={row} style={{ display: "flex" }}>
                            {Array.from({ length: cols }).map((_, col) => (
                                <img
                                    key={col}
                                    src={`/maps/${location}/${row}/${col}.png`}
                                    alt=""
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </TransformComponent>
        </TransformWrapper>
    );

};

export default Map;