import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const instanceId = 'instance53185';
const token = 'zyvfgq78imhe4bnh';

const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${instanceId}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
});


app.post('/webhook', (req, res) => {

    console.log(req.body);

    res.status(200)
        .json(
            {
                message: 'Nuevo Mensaje entrante',
                status: 200,
                data: req.body
            });
});


/**
 * @description CREATE NEW MESSAGE
 * @param to  Phone with international format e.g +52
 * @param body  Message text, Max length : 4096 characters.
 */
app.post('/newMessage', async (req, res) => {

    const { to, body } = req.body;

    try {

        const response = await axiosInstance.post('messages/chat', { token, to, body });

        res.status(200)
            .json(
                {
                    message: 'Chats obtenidos correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener los chats',
                    status: 500,
                    data: error
                });

    }


});

/**
 * @description GET MESSAGES
 * @param page   Pagination page number
 * @param limit  Number of messages per request
 * @param status Messages status [sent , queue , unsent , invalid, all]
 * @param sort   asc : sorted messages by ID from smallest to largest .
 *               desc : sorted messages by ID from largest to smallest
 */
app.get('/getMessages', async (req, res) => {

    const { page, limit, status, sort } = req.body;

    try {

        const response = await axiosInstance.post('messages', { 
            token,
            page,
            limit,
            status,
            sort
         });

        res.status(200)
            .json(
                {
                    message: 'Chats obtenidos correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener los chats',
                    status: 500,
                    data: error
                });

    }


});


export default app;