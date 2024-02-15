import axios from 'axios'
const endpoint = 'http://localhost:3000/api/auth/signup'

const registerUser = async(values) => {
    try {
        const {fullName, email, password} = values
        const response = await axios.post(endpoint, {
            fullName, email, password
        })
    
        const data = await response.data;
        return data;
        
    } catch (error) {
        console.log(error.message)
    }

}

export default registerUser;