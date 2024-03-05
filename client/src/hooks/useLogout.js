import { useState } from "react"
import axios from 'axios'
import { updateLocalStorage } from "./useRegister"
import useAuth from "./useAuth";

const endpoint = '/api/auth/logout'

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setUser} = useAuth();

    async function logout () {
        setLoading(true)
        try {
            await axios.post(endpoint)
            localStorage.removeItem('user')
            setUser(null)
        } catch (error) {
            console.log(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return { loading, logout};
};

export default useLogout;