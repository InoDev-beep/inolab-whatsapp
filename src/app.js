import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

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


/********* WEBHOOK  *****/

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


/********* INSTANCE  *****/

/**
 * @description LOGIN
 * @param token  Ultramsg Token
 */

app.get('/login', async (req, res) => {

    try {

        const response = await axiosInstance.post('qr', { token });

        res.status(200)
            .json(
                {
                    message: 'QR obtenido correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener el código QR',
                    status: 500,
                    data: error
                });

    }

});

/**
 * @description GET STATUS
 * @param token  Ultramsg Token
 */

app.get('/getInstanceStatus', async (req, res) => {

    try {

        const response = await axiosInstance.post('qr', { token });

        res.status(200)
            .json(
                {
                    message: 'QR obtenido correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener el código QR',
                    status: 500,
                    data: error
                });

    }

});

/**
 * @description LOGOUT
 * @param token  Ultramsg Token
 */

app.get('/logout', async (req, res) => {

    try {

        const response = await axiosInstance.post('logout', { token });

        res.status(200)
            .json(
                {
                    message: 'Sesión Cerrada Correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un problema al cerrar la sesión',
                    status: 500,
                    data: error
                });

    }

});


/**
 * @description CONFIG INSTANCE
 * @param token  Ultramsg Token
 * @param sendDelay Delay in seconds between sending message, Default 1
 * @param webhook_url Http or https URL for receiving notifications .
 * @param webhook_message_received  true/false notifications in webhooks when message received.
 * @param webhook_message_create true/false notifications in webhooks when message create.
 * @param webhook_message_ack true/false ack (message delivered and message viewed) notifications in webhooks.
 */

app.get('/config', async (req, res) => {

    try {

        const { sendDelay, webhookURL: webhook_url, onReceived: webhook_message_received, onCreated: webhook_message_create, onACK: webhook_message_ack } = req.body;

        const response = await axiosInstance.post('logout', { 
            token,  
            sendDelay,
            webhook_url,
            webhook_message_received,
            webhook_message_create,
            webhook_message_ack
        });

        res.status(200)
            .json(
                {
                    message: 'Configuración Realizada correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un problema al guardar la configuración',
                    status: 500,
                    data: error
                });

    }

});

/********* MESSAGES  *****/

/**
 * @description CREATE NEW MESSAGE
 * @param token  Ultramsg Token
 * @param to     Phone with international format e.g +52
 * @param body   Message text, Max length : 4096 characters.
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
 * @param token  Ultramsg Token
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
                    message: 'Mensajes obtenidos correctamente',
                    status: 200,
                    data: response
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener los mensajes',
                    status: 500,
                    data: error
                });

    }


});

/********* CHAT  *****/


/**
 * @description GET MESSAGES
 * @param token  Ultramsg Token
 * @param page   Pagination page number
 * @param limit  Number of messages per request
 * @param status Messages status [sent , queue , unsent , invalid, all]
 * @param sort   asc : sorted messages by ID from smallest to largest .
 *               desc : sorted messages by ID from largest to smallest
 */

app.get('/getChats', async (req, res) => {


    try {

        const response = await axiosInstance.post('chats', { token });

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