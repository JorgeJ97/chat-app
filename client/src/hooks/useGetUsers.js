import { useState } from "react";
import { errorNotification } from "../utils/notifications";
import useLogout from "./useLogout";
import useChatContext from "./useChatContext";
const searchUsersEndpoint = '/api/users/search-users';
const getUserEndpoint = '/api/users/user-details';
import { useNavigate } from "react-router-dom";


const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const { setChatUsers, setSelectedChat } = useChatContext();
    const { logout } = useLogout();
    const navigate = useNavigate();


    async function searchUsers(searchValue) {

        setLoading(true);
        try {
            const response = await fetch(`${searchUsersEndpoint}?search=${searchValue}`);
            const data = await response.json();
            if (data.error) throw Error(data.error)
            setChatUsers(data);
        } catch (error) {
            console.log('error in searchUser', error)
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                errorNotification('Session expired, log in again');
                return logout();
            }
            errorNotification('Internal server error');
            return logout();
        } finally {
            setLoading(false);
        }
    }

    async function getUser(userId) {
        try {
            const response = await fetch(`${getUserEndpoint}/${userId}`);
            const data = await response.json();
            if (data.error) throw Error(data.error)
            setSelectedChat(data);
        } catch (error) {
            console.log('error', error.message)
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token') {
                errorNotification('Session expired, log in again');
                return logout();
            }
            if (error.message === 'User not found') {
                navigate('/', { replace: true });
            }
        }

    }
    return { loading, searchUsers, getUser};
};

export default useGetUsers;