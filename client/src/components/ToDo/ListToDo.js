import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditToDo from "./EditToDo";

const ListToDo = () => {

    const [arr, setArr] = useState([]);

    const deleteNotes = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/dashboard/todos/${id}`, {
                method:"DELETE",
                headers:{token:localStorage.token}
            })
            const parseRes = response.json();
            if (parseRes === "Delete Successfully") {
                toast.success("Delete Successfully");
            } else {
                toast.error(parseRes);
            }


        } catch (err) {
            console.error(err.message);
        }
    }

    const getNotes = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard/todos", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const notes = await response.json();
            setArr(notes);

        } catch (err) {
            console.error(err.message);
        }
    }


    useEffect(() => {
        getNotes();
    });

    return (
        <TableContainer component={Paper} sx={{width:"70%", margin:"auto"}}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Delete</TableCell>
                    <TableCell align="left">Edit</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {arr.map((row) => (
                    <TableRow
                    key={row.m_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{row.notes}</TableCell>
                        <TableCell><Button variant="contained" onClick={() => deleteNotes(row.m_id)}>Delete</Button></TableCell>
                        <TableCell><EditToDo id={row.m_id}></EditToDo></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        );

}

export default ListToDo;