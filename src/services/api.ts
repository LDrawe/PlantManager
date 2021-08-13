import axios from 'axios';

const source = axios.CancelToken.source();
const token = source.token;

const api = axios.create({
    baseURL: 'http://192.168.100.7:3333',
    timeout: 10000,
    cancelToken: token
});

export default api;