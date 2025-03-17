import React, { useEffect, useState } from "react";

import GameHud from "./GameHud/GameHUD";
import LocationImage from "./LocationImage/LocationImage";
import Map from "../../components/Map/Map";

import styles from "./Round.module.scss";

interface Coordinates {
    x: number;
    y: number;
}

interface LocationData {
    name: string;
    coordinates: Coordinates;
    compassOffset: number;
    imageUrl: string;
}

interface GameData {
    mode: string;
    map: string;
    round: number;
    player1: string;
    scorePlayer1: number;
    player2?: string;
    scorePlayer2?: number;
    currentLocation: LocationData;
}

const Round: React.FC = () => {
    const [gameData, setGameData] = useState<GameData | null>(null);

    useEffect(() => {
        const fetchGameData = async () => {
            const mockData: GameData = {
                mode: "Classic",
                map: "White Orchard",
                round: 1,
                player1: "Marco",
                scorePlayer1: 3567,
                // player2: undefined,
                // scorePlayer2: undefined,
                player2: "Kolega",
                scorePlayer2: 4999,
                currentLocation: {
                    name: "white_orchard",
                    coordinates: { x: 18.2034, y: 9.2889 },
                    compassOffset: 15,
                    imageUrl: "/locations/white_orchard/19.png",
                },
            };

            setGameData(mockData);
        };

        fetchGameData();
    }, []);

    if (!gameData) return <p>Loading...</p>

    return (
        <div className={styles.container}>
            <GameHud
                mode={gameData.mode}
                map={gameData.map}
                round={gameData.round}
                player1={gameData.player1}
                scorePlayer1={gameData.scorePlayer1}
                player2={gameData.player2}
                scorePlayer2={gameData.scorePlayer2}
            />
            <LocationImage imageUrl={gameData.currentLocation.imageUrl} />
            <Map location={gameData.currentLocation.name} rows={4} cols={5} />
            {/* not sure about the rows and cols, have to rethink using that */}
        </div>
    )
}

export default Round;