import { useDispatch } from "react-redux"
import { handleLogout } from "../../../utils/handleLogout";

const AlreadyLoggedInPage: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h2 style={{color: "white"}}>You are already logged in!</h2>
            <p>Do you want to log out?</p>
            <button onClick={() => handleLogout(dispatch)}>Logout</button>
        </div>
    )
}

export default AlreadyLoggedInPage;