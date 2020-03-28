import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getData = async () => {
    const response = await axios.get(url);
    return response.data;
};

const createPerson = async newPerson => {
    const response = await axios.post(url, newPerson);
    return response.data;
};

const deleteId = async id => {
    await axios.delete(`${url}/${id}`);
};

const updateId = async ({name, number}, id) => {
    const response = await axios.put(`${url}/${id}`, {name, number, id});
    return response.data;
}

export default {getData, createPerson, deleteId, updateId};