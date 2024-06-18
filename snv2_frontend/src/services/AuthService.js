import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/auth'

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/login`, credentials)
    return res.data
}   

const register = async newObject => {
    const res = await axios.post(`${baseUrl}/register`, newObject)
    return res.data
}

export default  { login , register}
