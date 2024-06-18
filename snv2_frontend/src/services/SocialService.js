import axios from "axios"

// const baseUrl = 'http://localhost:3001/api/social' //! test json server
const baseUrl = 'http://localhost:3006/api/social'

const upload = async info => {
    const res = await axios.post(`${baseUrl}/upload`,info)
    return res
}

export default {upload}