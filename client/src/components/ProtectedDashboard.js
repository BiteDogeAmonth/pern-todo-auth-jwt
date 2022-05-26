import { Navigate } from "react-router-dom"
import DashBoard from "./Dashboard"

const ProtectedDashboard = (props) => {

    const setAuth = (bool) => {
        props.setAuth(bool);
    }

    return props.isAuth ? <DashBoard setAuth={setAuth}/> : <Navigate to="/login"/>;
}

export default ProtectedDashboard;