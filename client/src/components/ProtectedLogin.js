import { Navigate } from "react-router-dom";
import Login from "./Login"

const ProtectedLogin = (props) => {
    const setAuth = (bool) => {
        props.setAuth(bool);
    }

    return !props.isAuth ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard"/>;
}

export default ProtectedLogin;