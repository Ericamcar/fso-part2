import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const { data } = await axios.get(baseUrl);
    return data;
}

const create = async (noteObj) => {
    const { data } = await axios.post(baseUrl, noteObj);
    return data;
}

const update = async (id, noteObj) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, noteObj);
    return data;
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
}

export default {getAll, create, update, remove};