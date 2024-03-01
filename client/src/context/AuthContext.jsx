import { createContext, useState } from "react";

export const AuthContext = createContext();

const authUser = JSON.parse(window.localStorage.getItem('user')) || null;


export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(authUser);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

