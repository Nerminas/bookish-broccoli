import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import {AuthContext} from "../auth/AuthProvider";
import {Alert} from "@mui/material";
import CollapseableAlert from "../components/CollapseableAlert";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginPage() {
    let [authFailed, setAuthFailed] = useState<boolean>(false)

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useContext(AuthContext)

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        console.log("load LoginPage");
        if (auth.user) {
            console.log("already logged in")
            navigate("/dashboard");
        }
    }, [])


    //TODO db connection
    const validLoginData: UserData[] = [
        {
            username: "david",
            password: "david"
        }
    ]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let userData: UserData = {
            username: data.get('email') as string,
            password: data.get('password') as string
        }

        let isValid = validLoginData.find(user => JSON.stringify(user) === JSON.stringify(userData)) !== undefined
        if(isValid){
            auth.signin(userData.username, () => {
                console.log("from: ", from)
                navigate(from, { replace: true })
            })

        } else {
            console.log("Login invalid")
            setAuthFailed(true)
        }
    };

    const loginMask = (
        <>
            <CssBaseline/>
            <Grid container>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    {authFailed &&
                        <CollapseableAlert severity="error" message={"Login failed!"} onCancel={() => setAuthFailed(false)}/>}
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            color={authFailed ? "error" : "primary"}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color={authFailed ? "error" : "primary"}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
            </Grid>
            </Grid>
        </>
    )

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                {loginMask}
            </Grid>
        </ThemeProvider>
    );
}



interface UserData {
    username: string,
    password: string
}
