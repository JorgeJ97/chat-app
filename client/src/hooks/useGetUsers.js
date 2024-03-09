import { useState, useEffect } from "react";
import { errorNotification} from "../utils/notifications";
import useLogout from "./useLogout";
const getUsersEndpoint = '/api/users'


const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);
    const { logout } = useLogout();


    useEffect(() => {

        async function getUsers() {
    
            setLoading(true);
            try {
                const response = await fetch(getUsersEndpoint);
                const data = await response.json();
                if (data.error) throw Error(data.error)
                setChatUsers(data);
            } catch (error) {
                console.log(error.message)
                if(error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token') {
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
    return { loading, chatUsers };
};

export default useGetUsers;