import { useState, useEffect } from "react";
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";
import useChatContext from "./useChatContext";
const getUsersEndpoint = '/api/users'


const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const { setChatUsers, setAllChatUsers } = useChatContext();
    const { logout } = useLogout();


    useEffect(() => {

        async function getUsers() {

            setLoading(true);
            try {
                const response = await fetch(getUsersEndpoint);
                const data = await response.json();
                if (data.error) throw Error(data.error)
                setChatUsers(data);
                setAllChatUsers(data);
            } catch (error) {
                console.log(error.message)
                if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token') {
                    errorNotification('Session expired, log in again');
                    return logout();
                }
                errorNotification('Internal server error');
                return logout();
            } finally {
                setLoading(false);
            }
        }
        getUsers();

    }, [])
    return { loading };
};

export default useGetUsers;