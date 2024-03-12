import { useState } from "react";
import useChatContext from "./useChatContext";
const sendMessageEndpoint = 'api/message/send/'
import { errorNotification } from "../utils/notifications";


const useSendMessage = () => {
    const {messages, setMessages, selectedChat} = useChatContext();
    const [loading, setLoading] = useState(false);

    async function sendMessage (message) {
        setLoading(true);
        try {
            const response = await fetch(`${sendMessageEndpoint}${selectedChat?._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await response.json();
            if (data.error) throw Error(data.error);
            else setMessages([...messages, data]);

        } catch (error) {
            console.log(error.message);
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token') {
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
