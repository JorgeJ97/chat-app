import { useEffect } from "react";
import useChatContext from "../hooks/useChatContext";
import sound from '../assets/sounds/campana.mp3';
import { useSocket } from "../context/SocketContext";
import useAuth from "./useAuth";



const useListenSocket = () => {
    const { setMessages, setConversations, selectedChat } = useChatContext(); 
    const {socket} = useSocket();
    const {user} = useAuth();

    useEffect(() => {

        // Listen new messages and update states
        socket?.on("new_message",  (newMessage, updatedChat) => {
            newMessage.shake = true;
            const notification = new Audio(sound);
            notification.play();
            // Update messages state
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Update chats
            setConversations((prevChats) => {
                const newChats = prevChats.map(chat => {
                    if(chat._id.toString() === updatedChat._id.toString()){
                        if(selectedChat?._id && selectedChat?._id.toString() === chat.user?._id.toString()){

                            socket?.emit("mark_as_read", {
                                chatId: chat._id,
                                userId: user?.id
                            });
                            return {
                                ...updatedChat,
                                unread: {}
                            }
                        }
                        return updatedChat;
                    }
                    return chat;
                })
                return newChats;
            });
        })

        socket?.on("new_chat", (newChat) => {
            setConversations((prevChats)=> {
                return [...prevChats, newChat]
            })

        })

        return () => {
            socket?.off("new_message");
            socket?.off("new_chat");
            
        }
    
    },[socket, setMessages, setConversations, selectedChat?._id])
}

export default useListenSocket;