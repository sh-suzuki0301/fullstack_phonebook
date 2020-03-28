import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getData = async () => {
    try { 
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default {getData};