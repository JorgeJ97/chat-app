import { useEffect, useState } from "react";
import useChatContext from "./useChatContext";
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";
const conversationsEndpoint = 'api/users/user-chats';


const useGetCoversations = () => {
    const { setConversations } = useChatContext();
    const { logout } = useLogout();


    const getConversations = async () => {
        try {
            const response = await fetch(conversationsEndpoint);
            const data = await response.json();
            if (data.error) throw Error(data.error);
            setConversations(data);
        } catch (error) {
            console.log(error.message)
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                errorNotification('Session expired, log in again');
                return logout();
            }
            errorNotification('Internal server error');
        }

    }


    return { getConversations };
}

export default useGetCoversations;
