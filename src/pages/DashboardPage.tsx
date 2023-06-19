import Button from "@mui/material/Button";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import Navigation from "../components/Navigation";

export default function DashboardPage(props: DashboardPageProps) {
    const auth = useContext(AuthContext)
    let navigate = useNavigate();

    return (
        <>
            <Navigation />
            <h1>Hello {props.user}!</h1>
            <Button onClick={() => {auth.signout(()=>{navigate("/")})}}> Logout </Button>
        </>
    )
}

interface DashboardPageProps {
    user: string
}
