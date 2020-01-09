import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://myfirebaseproject-4be32.firebaseio.com/'
});

export default AxiosInstance;