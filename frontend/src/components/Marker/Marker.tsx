import styles from "./Marker.module.scss";

// future days: Marker with the profile picture

interface MarkerProps {
    x: number;
    y: number;
}

const Marker: React.FC<MarkerProps> = ({ x, y }) => {
    return (
        <div
            className={styles.marker}
            style={{
                left: `${x}%`,
                top: `${y}%`
            }}
        ></div>
    );
};

export default Marker;