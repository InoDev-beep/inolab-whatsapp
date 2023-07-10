import axios from 'axios';
const instanceId = 'instance53765';
const token = 'tzyqyn7j2h64y4hy';

export const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${instanceId}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
    params: { token }
});
