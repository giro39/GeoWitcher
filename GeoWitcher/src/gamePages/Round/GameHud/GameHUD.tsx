import React from "react";

import styles from "./GameHUD.module.scss";

interface GameHUDProps {
    mode: string;
    map: string;
    round: number;
    player1: string;
    scorePlayer1: number;
    player2?: string;
    scorePlayer2?: number;
}

const GameHUD: React.FC<GameHUDProps> = ({ mode, map, round, player1, scorePlayer1, player2, scorePlayer2 }) => {
    return (
        <div className={styles.container}>
            <div className={styles.hudColumn}>
                <p className={styles.colTitle}>Mode</p>
                <p className={styles.colText}>{mode}</p>
            </div>
            <div className={styles.hudColumn}>
                <p className={styles.colTitle}>Map</p>
                <p className={styles.colText}>{map}</p>
            </div>
            <div className={styles.hudColumn}>
                <p className={styles.colTitle}>Round</p>
                <p className={styles.colText}>{round}</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.players}>
                <div className={styles.player}>
                    <p className={styles.playerName}>{player1}</p>
                    <p className={styles.playerScore}>{scorePlayer1}</p>
                </div>
                {player2 && scorePlayer2 &&
                    <div className={styles.player}>
                        <p className={styles.playerName}>{player2}</p>
                        <p className={styles.playerScore}>{scorePlayer2}</p>
                    </div>
                }
            </div>
        </div>
    )
};

export default GameHUD;
