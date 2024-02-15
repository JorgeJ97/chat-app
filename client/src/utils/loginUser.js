import axios from 'axios'
const endpoint = 'http://localhost:3000/api/auth/sigin'

const loginUser = async(values) => {
    const {email, password} = values
    const response = await axios.post(endpoint, {
        email, password
    })

    const data = await response.data;
    return data;

}

export default loginUser;