import axios from 'axios';
const source = axios.CancelToken.source();
const token = source.token;

const api = axios.create({
    baseURL: 'http://192.168.1.106:3333',
    cancelToken: token
});

export default api;