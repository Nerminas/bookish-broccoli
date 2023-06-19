import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthProvider";

export default function RequireAuth(props: RequireAuthProps) {
    const auth = useContext(AuthContext)
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return props.children;
}

interface RequireAuthProps{
    children: JSX.Element
}