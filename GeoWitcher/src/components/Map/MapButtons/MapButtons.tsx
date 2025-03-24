import React from "react";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { TiPin } from "react-icons/ti";

import styles from "./MapButtons.module.scss";

import { MapSize } from "../mapTypes";

interface MapButtonsProps {
    mapSize: MapSize;
    setMapSize: (size: MapSize) => void;
    transformWrapperRef: React.RefObject<any>;
    isPinned: boolean;
    setIsPinned: (isPinned: boolean) => void;
}

const MapButtons: React.FC<MapButtonsProps> = ({
    mapSize,
    setMapSize,
    transformWrapperRef,
    isPinned,
    setIsPinned,
}) => {
    const onSizeUp = () => {
        if (mapSize === "small") setMapSize("medium");
        else if (mapSize === "medium") setMapSize("large");
    };

    const onSizeDown = () => {
        if (mapSize === "large") setMapSize("medium");
        else if (mapSize === "medium") setMapSize("small");
    };

    const onPin = () => {
        setIsPinned(!isPinned);
    };

    const zoomIn = () => {
        if (transformWrapperRef.current) {
            transformWrapperRef.current.zoomIn();
        }
    };

    const zoomOut = () => {
        if (transformWrapperRef.current) {
            transformWrapperRef.current.zoomOut();
        }
    };

    return (
        <div className={styles.positionalButtons}>
            <div className={styles.mapSize}>
                <button
                    className={`${styles.sizeUp} ${
                        mapSize === "large" ? styles.disabled : ""
                    }`}
                    onClick={onSizeUp}
                >
                    <MdArrowOutward />
                </button>
                <button
                    className={`${styles.sizeDown} ${
                        mapSize === "small" ? styles.disabled : ""
                    }`}
                    onClick={onSizeDown}
                >
                    <MdArrowOutward />
                </button>
                <button
                    className={`${styles.pin} ${
                        isPinned ? styles.pinActive : ""
                    }`}
                    onClick={onPin}
                >
                    <TiPin />
                </button>
            </div>
            <div className={styles.mapZoom}>
                <button className={styles.zoomIn} onClick={zoomIn}>
                    <FaPlus />
                </button>
                <button className={styles.zoomOut} onClick={zoomOut}>
                    <FaMinus />
                </button>
            </div>
        </div>
    );
};

export default MapButtons;
