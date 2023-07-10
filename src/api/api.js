import axios from 'axios';
const instanceId = 'instance53185';
const token = 'zyvfgq78imhe4bnh';

export const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${instanceId}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
    params: { token }
});
