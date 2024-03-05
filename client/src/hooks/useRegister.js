import { useState } from "react"
import { successNotification, errorNotification } from "../utils/notifications";
import axios from 'axios'
import validate from "../utils/validate";
import useAuth from "./useAuth";

const endpoint = '/api/auth/signup'


const useRegister = () => {

    const [loading, setLoading] = useState(false)
    const {setUser} = useAuth();


    const registerUser = async (values) => {

        const submit = true;
        const newErrors = validate(values, submit);
        const { fullName, email, password } = values;


        setLoading(true)
        try {
            if (Object.keys(newErrors).length === 0) {

                const response = await axios.post(endpoint, {
                    fullName, email, password
                })

                const data = await response.data;

                if (data) {
                    if (data.registration) {
                        successNotification(data.msg);
                        updateLocalStorage(data.user);
                        setUser(data.user)
                        return null;
                    } else {
                        errorNotification(data.msg)
                    }
                }
            } else {
                return newErrors;
            }
        } catch (error) {
            console.log(error.message);
            errorNotification('Internal server error')

        } finally {
            setLoading(false);
        }


    }

    return { loading, registerUser};

}

export default useRegister;


export function updateLocalStorage (data) {
    window.localStorage.setItem('user', JSON.stringify(data));
}