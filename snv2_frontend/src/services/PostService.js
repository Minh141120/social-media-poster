import axios from "axios"

// const baseUrl = 'http://localhost:3001/posts' //! test json server
const baseUrl = 'http://localhost:3005/api/posts'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const create = async newObject => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

const edit = async (id, newObject) =>{
    const res = await axios.put(`${baseUrl}/${id}`, newObject)
    return res.data
}

const remove = async id => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
}

export default {getAll, getById, create, edit, remove}