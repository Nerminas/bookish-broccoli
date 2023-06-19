import {Link, Outlet, Route, Routes} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthProvider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import InputFormPage from "../pages/InputFormPage";
import CalendarPage from "../pages/CalendarPage";
import {ListItem} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import MuiDrawer from "@mui/material/Drawer";

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
`;

//TODO make global constant
const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Sidebar(props: SidebarProps) {
    let [open, setOpen] = useState<boolean>(props.open)

    useEffect(() => {

        console.log("Sidebar: ", props.open)
    }, [props.open])

    function handleClick() {
        console.log("clicked in sidebar")
        props.toggle()
    }


    return (
        <Drawer variant="permanent" open={props.open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={handleClick}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <StyledLink to="/input">New Entry</StyledLink>
                    </ListItemText>
                </ListItemButton>
                <Divider sx={{my: 1}}/>
            </List>

        </Drawer>
    )
}

interface SidebarProps {
    toggle: () => void
    open: boolean
    drawerWidth: number
}