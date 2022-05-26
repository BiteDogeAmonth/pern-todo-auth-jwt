import { Link, TextField } from '@mui/material';
import { Button } from "@mui/material";
import { Box, Container} from '@mui/system';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                email : email,
                password : password,
            }
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
    
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                toast.success("Login Successfully");
                props.setAuth(true); 
            } else {
                toast.error(parseRes);
                props.setAuth(false);
            }
            setEmail('');
            setPassword('');         
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <Fragment>
            <Container component="main">
                <h2>Login</h2>
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
                            value={password}
                            sx= {{marginTop:2, width:300}}
                            onChange={e => setPassword(e.target.value)} 
                            label='Password' 
                            placeholder='Enter Password' 
                            type="password"
                            fullWidth required/>
                        <Button type='submit' variant='contained' sx={{marginTop: 2, marginBottom: 2}}>Log in</Button>
                    </Box>
                </form>
                <Link href="/register">Doesn't have an account?</Link>
            </Container>
        </Fragment>
    );
}

export default Login;