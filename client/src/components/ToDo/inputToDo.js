import { Box, Button, TextField } from "@mui/material";
import { useState } from "react"
import { toast } from "react-toastify";

const InputToDo = () => {
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {notes : input};
            const response = await fetch("http://localhost:3000/dashboard/todos", {
                method: "POST",
                headers: {"Content-Type":"application/json", token:localStorage.token},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes === "Insert Successfully") {
                toast.success("New Note Added!");
            } else {    
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err);
        }
        setInput('');
    }

    return (
        <Box sx={{marginTop:2}}> 
            <form onSubmit={e => handleSubmit(e)}>
                <TextField 
                sx={{width: 500}}
                label="Add a note!"
                placeholder="Enter New Note"
                value={input}
                onChange={e => setInput(e.target.value)}
                />
                <Button sx={{height:55, width:100, marginLeft:1}} variant="contained" type="submit">Add</Button>
            </form>
        </Box>
    )
}

export default InputToDo;