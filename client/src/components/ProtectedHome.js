import { Navigate } from "react-router-dom"

const ProtectedHome = (props) => {
    console.log(props.isAuth);
    return props.isAuth ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>
}

export default ProtectedHome;