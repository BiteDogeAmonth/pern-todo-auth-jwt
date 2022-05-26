import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputToDo from "./ToDo/inputToDo";
import ListToDo from "./ToDo/ListToDo";

const DashBoard = (props) => {

    const [name, setName] = useState('');
    
    const getName = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            setName(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    } 

    useEffect(() => {
        getName();
    }, [name]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
        toast.success("Logged out");
    }

    return (
        <div>
            <div>
                <h3>Welcome! {name} Here is your ToDo list</h3>
                <Button sx={{width:100}}variant="contained" onClick={e => logout(e)}>Logout</Button>
            </div>
            <InputToDo/>
            <div style={{marginTop:"30px"}}>
                <ListToDo/>
            </div>
        </div>
    );
}

export default DashBoard;