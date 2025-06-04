import { Link } from "react-router-dom"

// import styles from "./Profile.module.scss"

const Profile: React.FC = () => {
    return (
        <div>
            <p>Profile</p>
            <Link to={"/"}>Go back</Link>
        </div>
    )
}

export default Profile;