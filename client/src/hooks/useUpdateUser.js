import { useState } from "react";
const updateUserEndpoint = 'api/users/update-user'
import { errorNotification, successNotification } from "../utils/notifications";
import useAuth from "./useAuth";
import { updateLocalStorage } from "./useRegister";
import useLogout from "./useLogout";
const DELETE_IMAGE_ENDPOINT = '/api/users/delete-user-image';


const useUpdateUser = () => {
    const { logout } = useLogout();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);

    async function updateUser(values) {
        setLoading(true);
        try {
            const response = await fetch(`${updateUserEndpoint}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (data.error) throw Error(data.error);
            else {
                setUser(data);
                updateLocalStorage(data);
                successNotification('profile updated successfully');
            }

        } catch (error) {
            console.log(error.message);
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                errorNotification('Session expired, log in again');
                return logout();
            }

            errorNotification('Internal server error');
        } finally {
            setLoading(false);
        }
    }

    async function deleteUserImage(imageUrl) {
        setLoading(true);
        try {
            const response = await fetch(`${DELETE_IMAGE_ENDPOINT}?imageUrl=${imageUrl}`,{
                method: 'DELETE'
            })
            const data = await response.json();

            if (data.error) throw Error(data.error);
            setUser(data);
            updateLocalStorage(data);

        }catch (error) {
            console.log(error.message);
            if (error.message === 'Unauthorized, no token provided' || error.message === 'Unauthorized, invalid token' || error.message === 'User not found') {
                errorNotification('Session expired, log in again');
                return logout();
            }

            errorNotification('Internal server error');
        } finally {
            setLoading(false);
        }

    }

    return { updateUser, loading, deleteUserImage };

};

export default useUpdateUser;