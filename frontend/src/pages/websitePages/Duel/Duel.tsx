import { useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import styles from "./Duel.module.scss"

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Duel: React.FC = () => {
    const [_, setSocketConnected] = useState(false);
    const [areStartButtonsVisible, setAreStartButtonsVisible] = useState(true);
    // after refresh this is still here, probably have to add global state

    const handleCreate = () => {
        const socket: Socket = io(backendUrl, {
            withCredentials: true,
        });

        socket.on("connect", () => {
            setSocketConnected(true);
            console.log("Połączono z WebSocketem!", socket.id);

            fetch(`${backendUrl}/api/rooms/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ mode: "Duel" }),
            })
            .then(res => res.json())
            .then()
        });

        // remember to disconnect later
        // can add a debounce function to or remember to take care of this
        setAreStartButtonsVisible(false);
    }

    const handleJoin = () => {

    }

    return (
        <div>
            <p>Duel</p>
            {
                areStartButtonsVisible && (
                    <div className={styles.startButtons}>
                        <button onClick={handleCreate}>Create a duel</button>
                        <button onClick={handleJoin}>Join a duel</button>
                    </div>
                )
            }
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default Duel;