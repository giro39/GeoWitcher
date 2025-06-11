import { Link } from "react-router-dom"

import { useDispatch } from "react-redux"; // delete
import { handleLogout } from "../../../utils/handleLogout"; // delete

// import styles from "./Profile.module.scss"

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <p>Profile</p>
            <Link to={"/"}>Go back</Link>
            <button onClick={() => handleLogout(dispatch)}>Logout</button>
        </div>
    )
}

export default Profile;