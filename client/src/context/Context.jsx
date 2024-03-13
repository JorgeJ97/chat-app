import { createContext, useState } from "react";

export const AuthContext = createContext();
export const ChatContext = createContext();


const authUser = JSON.parse(window.localStorage.getItem('user')) || null;


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(authUser);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatUsers, setChatUsers] = useState([]);
    const [allChatUsers, setAllChatUsers] = useState([]);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <ChatContext.Provider value={{
                messages, setMessages,
                selectedChat, setSelectedChat,
                chatUsers, setChatUsers,
                allChatUsers, setAllChatUsers
            }}>
                {children}
            </ChatContext.Provider>
        </AuthContext.Provider>
    )
}

