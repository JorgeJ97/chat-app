import { useState, useEffect } from "react";
import axios from 'axios';
import { errorNotification, successNotification } from "../utils/notifications";
import useLogout from "./useLogout";
const getUsersEndpoint = '/api/users'


const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const { logout } = useLogout();


    useEffect(() => {

        async function getUsers() {
    
            setLoading(true);
            try {
                const response = await fetch(getUsersEndpoint);
                const data = await response.json();
                if (data.error) throw Error(data.error)
                setChats(data);
            } catch (error) {
                console.log(error.message)
                if(error.message === 'Unauthorized, no token provided' || 'Unauthorized, invalid token') {
                    errorNotification('Session expired, log in again');
                    return logout();
                }
                errorNotification('Internal server error');
            } finally {
                setLoading(false);
            }
        }
        getUsers();

    }, [])
    return { loading, chats };
};

export default useGetUsers;