import { Link } from "react-router-dom"

// import styles from "./Duel.module.scss"

const Duel: React.FC = () => {
    return (
        <div>
            <p>Duel</p>
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default Duel;