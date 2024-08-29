import { useEffect, useState } from "react";
import useChatContext from "./useChatContext";
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";
const getMessagesEndpoint = 'api/message/'

const useGetMessages = () => {
    const { messages, setMessages, selectedChat, setConversations } = useChatContext();
    const { logout } = useLogout();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${getMessagesEndpoint}${selectedChat?._id}`);
                const data = await response.json();
                if (data.error) throw Error(data.error);
                setMessages(data?.messages);
                setConversations((prevChats) => {
                    const newChats = prevChats.map(chat => {
                        if(chat?._id.toString() === data?._id.toString()){
                            return {
                                ...chat,
                                unread: data?.unread
                            }
                        }
                        return chat;
                    })
                    return newChats;
                });
            } catch (error) {
                console.log(error.message)
                if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                    errorNotification('Session expired, log in again');
                    return logout();
                }
                errorNotification('Internal server error');
            } finally {
                setLoading(false);
            }
        }
        if (selectedChat?._id) getMessages();

    }, [selectedChat?._id, setMessages]);

    return { messages, loading };

}

export default useGetMessages;