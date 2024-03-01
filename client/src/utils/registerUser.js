import axios from 'axios'
const endpoint = 'http://localhost:3000/api/auth/signup'
import validate from './validate'
import { errorNotification, successNotification } from './notifications'

const registerUser = async(values) => {

    const submit = true;
    const newErrors = validate(values, submit);
    const {fullName, email, password} = values

try {
        if (Object.keys(newErrors).length === 0) {
    
            const response = await axios.post(endpoint, {
                fullName, email, password
            })
        
            const data = await response.data;
    
            if(data){
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
    console.log(error.message)
    
}


}

export default registerUser;