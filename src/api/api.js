import axios from 'axios';
import { INSTANCE_ID, TOKEN } from '../config.js';


export const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${INSTANCE_ID}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
    params: { token: TOKEN }
});
