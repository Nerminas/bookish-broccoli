import {Link, Outlet} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../auth/AuthProvider";

export default function Navigation() {

    const auth = useContext(AuthContext);

    if (!auth.user){
        return <></>
    }


    return (
        <>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/calendar">Calendar</Link>
                </li>
            </ul>

            <Outlet/>
        </>
    )
}