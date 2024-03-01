import { useState } from "react"
import { successNotification, errorNotification } from "../utils/notifications";
import validate from "../utils/validate";


const useRegister = () => {

    const [loading, setLoading] = useState(false)

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
                        successNotification(data.msg)
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
            errorNotification(error.message)

        } finally {
            setLoading(false);
        }


    }

    return { loading, registerUser};

}

export default useRegister;