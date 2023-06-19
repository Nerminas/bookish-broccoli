import React from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage";
import {Routes, Route, Link, Outlet} from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./auth/RequireAuth";
import AuthProvider from "./auth/AuthProvider";
import Navigation from "./components/Navigation";


function App() {

    return (
        <AuthProvider>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={
                            <RequireAuth>
                                <DashboardPage user={"david"}/>
                            </RequireAuth>
                        }/>
                        <Route path="/calendar" element={
                            <RequireAuth>
                                <DashboardPage user={"calendar"}/>
                            </RequireAuth>
                        }/>
                        <Route path={"/login"} element={<LoginPage/>} />
                    </Routes>
                </header>
            </div>
        </AuthProvider>
    );
}


export default App;
