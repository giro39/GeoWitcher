import { Link } from "react-router-dom"

// import styles from "./Singleplayer.module.scss"

const Singleplayer: React.FC = () => {
    return (
        <div>
            <p>Singleplayer</p>
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default Singleplayer;