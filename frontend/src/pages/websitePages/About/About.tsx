import { Link } from "react-router-dom"

// import styles from "./About.module.scss"

const About: React.FC = () => {
    return (
        <div>
            <p>About</p>
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default About;