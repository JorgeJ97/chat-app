import { useState, useEffect } from "react";
import axios from 'axios';
import { errorNotification, successNotification } from "../utils/notifications";
const getUsersEndpoint = '/api/users'


const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);


    useEffect(() => {

        async function getUsers() {
    
            setLoading(true);
            try {
                const response = await axios(getUsersEndpoint);
                const data = await response.data;
                console.log(data)
                if (data.error) throw Error(data.error)
                setChats(data);
            } catch (error) {
                console.log(error.message)
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