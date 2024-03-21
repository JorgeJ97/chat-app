import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { io } from 'socket.io-client'

const productionUrl = 'https://chat-app-production-c4pw.onrender.com/'

export const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useAuth();

    
    
    useEffect(() => {
        
        if (user) {
            const socket = io(productionUrl, {
                query: {
                    userId: user.id
                }
            })
            setSocket(socket)

            socket.on("online_users",  (onlineUsersId) => {
                setOnlineUsers(onlineUsersId);
            })
            return () => socket.close();
            
        }else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
        }


    }, [user])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}