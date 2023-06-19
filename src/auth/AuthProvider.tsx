import React, {ReactNode, useState} from "react";
import {fakeAuthProvider} from "./FakeAuth";

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider(props: AuthProviderProps){
    let [user, setUser] = useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        })
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        })
    }

    let authContextData: AuthContextType = {user, signin, signout}

    return(
        <AuthContext.Provider value={authContextData}>
            {props.children}
        </AuthContext.Provider>
    )
}


interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

interface AuthProviderProps{
    children: ReactNode
}