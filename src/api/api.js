import axios from 'axios';
const instanceId = 'instance54883';
const token = 'mui1s6wckkgpnm5t';


export const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${instanceId}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
    params: { token }
});
