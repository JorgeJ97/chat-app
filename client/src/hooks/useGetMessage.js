import { useEffect, useState } from "react";
import useChatContext from "./useChatContext";
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";
const getMessagesEndpoint = 'api/message/'

const useGetMessages = () => {
    const { messages, setMessages, selectedChat } = useChatContext();
    const { logout } = useLogout();

    useEffect(() => {

        const getMessages = async () => {

            try {
                const response = await fetch(`${getMessagesEndpoint}${selectedChat?._id}`);
                const data = await response.json();
                if (data.error) throw Error(data.error);
                setMessages(data);
            } catch (error) {
                console.log(error.message)
                if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token') {
                    errorNotification('Session expired, log in again');
                    return logout();
                }
                errorNotification('Internal server error');
            } finally{
                setLoading(false);
            }
        }
        if(selectedChat?._id) getMessages();

    }, [selectedChat?._id, setMessages]);

    return { messages };

}

export default useGetMessages;