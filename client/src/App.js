
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import ProtectedLogin from './components/ProtectedLogin';
import ProtectedDashboard from './components/ProtectedDashboard';
import ProtectedHome from './components/ProtectedHome';
import ProtectedRegister from './components/ProtectedRegister';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (bool) => {
    setIsAuth(bool);
  }

  const verifyAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        headers: {token: localStorage.token}
      }) 

      const parseRes = await response.json();
      parseRes === true ? setAuth(true) : setAuth(false);

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    verifyAuth();
  })

  return (
    <div className="App">
      <Router>
        <Routes> 
          <Route exact path="/" element={<ProtectedHome isAuth={isAuth}/>}/>
          <Route exact path="/login" element={<ProtectedLogin isAuth={isAuth} setAuth={setAuth}/>}/> 
          <Route exact path="/register" element={<ProtectedRegister isAuth={isAuth} setAuth={setAuth}/>}/> 
          <Route exact path="/dashboard" element={<ProtectedDashboard isAuth={isAuth} setAuth={setAuth}/>}/> 
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
