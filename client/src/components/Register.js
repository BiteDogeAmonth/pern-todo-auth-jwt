import { Link, TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Box, Container} from '@mui/system';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const body = {
                email : email,
                password : password,
                name : name, 
            }

            const response = await fetch("http://localhost:3000/auth/register", {
                method : "POST",
                headers : {"Content-Type":"application/json"},
                body : JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                
                localStorage.setItem("token", parseRes.token);
                props.setAuth(true);
                toast.success("Register Successfully");
            } else {
                props.setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Container component="main">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <Box sx={{maxWidth: 300, margin: "auto"}}>
                        <TextField
                            value={email}
                            sx= {{marginTop:2, width:300}}
                            onChange={e => setEmail(e.target.value)} 
                            label='Email Address' 
                            placeholder='Enter Email Address' 
                            fullWidth required/>
                        <TextField
                            value={name}
                            sx= {{marginTop:2, width:300}}
                            onChange={e => setName(e.target.value)} 
                            label='User Name' 
                            placeholder='Enter User Name' 
                            fullWidth required/>
                        <TextField
                            value={password}
                            sx= {{marginTop:2, width:300}}
                            onChange={e => setPassword(e.target.value)} 
                            label='Password' 
                            placeholder='Enter Password' 
                            type="password"
                            fullWidth required/>
                        <Button type='submit' variant='contained' sx={{marginTop: 2, marginBottom: 2}}>Submit</Button>
                    </Box>
                </form>
                <Link href="/login">Already had an account?</Link>
            </Container>
        </Fragment>
    );
}

export default Register;