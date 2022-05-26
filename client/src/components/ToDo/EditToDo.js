import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const EditToDo = (props) => {

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {notes:content};
            const response = await fetch(`http://localhost:3000/dashboard/todos/${props.id}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json", token:localStorage.token},
                body: JSON.stringify(body)
            });
            
            const parseRes = await response.json();
            if (parseRes === "Note Updated!") {
                toast.success("Note Updated!");
            } else {
                toast.error(parseRes);
            }
        } catch (err) {
            console.log(err.message);
        }

        setContent("");
        setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
            <div>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Edit Your Notes</DialogTitle>
                    <form onSubmit={e => handleSubmit(e)}>
                        <TextField 
                            value={content}
                            sx={{width:"450px", marginBottom:"50px", marginLeft:"50px"}} 
                            label="Enter New Content" 
                            placeholder="New Content here" 
                            onChange={e => setContent(e.target.value)}>
                        </TextField>
                        <Button variant="contained" type="submit">Edit</Button>
                    </form>
                </Dialog>
            </div>
        </div>
    );

}

export default EditToDo;