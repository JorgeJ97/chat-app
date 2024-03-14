import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import io from 'socket.io-client'

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user} = useAuth();
    console.log(user)

    useEffect(() => {
        if(user) {
            const socket = io('http://localhost:3000');
            setSocket(socket);

            return () => socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }

        }
    }, [user])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}