import { useState } from "react";
import useChatContext from "./useChatContext";
const sendMessageEndpoint = 'api/message/send/'
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";


const useSendMessage = () => {
    const {messages, setMessages, selectedChat, setConversations} = useChatContext();
    const [loading, setLoading] = useState(false);
    const {logout} = useLogout();

    async function sendMessage (messageInput) {
        setLoading(true);
        try {
            const response = await fetch(`${sendMessageEndpoint}${selectedChat?._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageInput)
            })
            const data = await response.json();
            if (data.error) throw Error(data.error);
            else {
                setMessages([...messages, data?.message]);
                setConversations(prevChats => {
                    const newChats = prevChats.map(chat => {
                        if(chat._id.toString() === data?.chatId.toString()){
                            return {
                                ...chat,
                                lastMessage: data?.message
                            } 
                        }
                        return chat;
                    })
                    return newChats;

                })
            }

        } catch (error) {
            console.log(error.message);
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                errorNotification('Session expired, log in again');
                return logout();
            }
            errorNotification('Internal server error');
        } finally{
            setLoading(false);
        }
    }

    return {sendMessage, loading};

};

export default useSendMessage;
