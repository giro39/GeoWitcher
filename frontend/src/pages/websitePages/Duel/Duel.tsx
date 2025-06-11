import { useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import styles from "./Duel.module.scss"

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Duel: React.FC = () => {
    const [_, setSocketConnected] = useState(false);
    const [areStartButtonsVisible, setAreStartButtonsVisible] = useState(true);
    const [showJoinForm, setShowJoinForm] = useState(false);
    // after refresh this is still here, probably have to add global state
    const [joinCode, setJoinCode] = useState("");
    const [joinError, setJoinError] = useState<string | null>(null);

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
        setShowJoinForm(true);
    }

    const handleJoinRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        setJoinError(null);

        const res = await fetch(`${backendUrl}/api/rooms/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ roomId: joinCode }),
        });

        const data = await res.json();

        if (res.ok) {
            setAreStartButtonsVisible(false);
            setShowJoinForm(false);
        } else {
            setJoinError(data.error || "Some error occured during joining to the room.")
        }
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
            {showJoinForm && (
                <form onSubmit={handleJoinRoom} className={styles.joinForm}>
                   <input
                        type="text"
                        placeholder="Enter room code"
                        value={joinCode}
                        onChange={e => setJoinCode(e.target.value)}
                        required
                    />
                    <button type="submit">Join</button>
                    {joinError && <div style={{color: "red"}}>{joinError}</div>}
                </form>
            )

            }
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default Duel;