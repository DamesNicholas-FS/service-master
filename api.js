import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000' // replace it with your server URL
});

export default instance;
