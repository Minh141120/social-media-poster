import axios from 'axios'

// const baseUrl = "http://localhost:3001/users" // test json-server
const baseUrl = 'http://localhost:3009/api/users'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const getByUsername = async (username) => {
    const res = await axios.get(`${baseUrl}/username/${username}`,username)
    return res.data
}

const create = async newObject => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl}/${id}`,newObject)
    return res.data
}

const remove = async id => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
}

export default {getAll, getById, getByUsername, create, update, remove}