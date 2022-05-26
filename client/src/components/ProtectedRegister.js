import { Navigate } from "react-router-dom";
import Register from "./Register";

const ProtectedRegister = (props) => {
    const setAuth = (bool) => {
        props.setAuth(bool)
    }
    return props.isAuth ? <Navigate to="/dashboard"/> : <Register setAuth={setAuth}/>;
} 
export default ProtectedRegister;