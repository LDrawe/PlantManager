import axios from 'axios';

const { token } = axios.CancelToken.source();

const api = axios.create({
    baseURL: 'http://192.168.100.5:3333',
    timeout: 10000,
    cancelToken: token
});

export default api;