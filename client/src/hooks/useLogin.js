import { useState } from "react";
import axios from 'axios';
import { errorNotification, successNotification } from "../utils/notifications";
import { updateLocalStorage } from "./useRegister";
import useAuth from "./useAuth";

const loginEndPoint = '/api/auth/signin'


const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setUser} = useAuth();
    
    async function login (values) {
        setLoading(true)
        try {
            const {email, password} = values;
            if(password === '' || email === '') return errorNotification('Please fill out all the fields');
            const response = await axios.post(loginEndPoint, values);
            const data = await response.data;
            console.log(response)
            if(data.isLogged){
                updateLocalStorage(data.user);
                setUser(data.user);
                successNotification(data.msg)
            }
            else {
                console.log(data)
                errorNotification(data.msg)
            }

            
        } catch (error) {
            console.log(error.message);
            errorNotification('Internal server error');
        } finally {
            setLoading(false);
        }

    }

    return { loading, login};

};

export default useLogin;