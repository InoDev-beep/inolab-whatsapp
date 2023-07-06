import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import nodemailer from 'nodemailer'
import { messageTemplate } from './email-template.js';

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

const instanceId = 'instance53185';
const token = 'zyvfgq78imhe4bnh';
let messages = []

const axiosInstance = axios.create({
    baseURL: `https://api.ultramsg.com/${instanceId}/`,
    withCredentials: false,
    reponseEncoding: 'utf8',
    headers: {
        'Content-Type': 'application/json'
    },
    params: { token }
});

const transporter = nodemailer.createTransport({
    host: 'smtppro.inolab.com',
    port: 1025,
    secure: false,
    ignoreTLS: true,
    secureConnection: false,
    requiresAuth: false,
    auth: {
        user: 'noreply@inolab.com',
        pass: 'M_InolabMail22*'
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
});


/********* WEBHOOK  *****/

app.post('/webhook', async (req, res) => {

    const { data } = req.body;
    const { id, from, pushname, body, time } = data;

    const phone = from.toString().split('@')[0];
    messages.push({ id, phone, pushname, body, time });

    try {

        let info = await transporter.sendMail({
            from: 'noreply@inolab.com',
            to: 'josehernandez@inolab.com',
            subject: 'Nuevo Mensaje de WhatsApp',
            html: messageTemplate(phone, pushname, body),
        });

        console.log('Email sent:', info.response);

    } catch (error) {

        console.log('Error occurred:', error);
    }

    console.log(messages);
});


/********* INSTANCE  *****/

/**
 * @description LOGIN
 * @param token  Ultramsg Token
 */

app.get('/login', async (req, res) => {

    try {

        const { data } = await axiosInstance.get('instance/qr', {
            responseType: 'arraybuffer'
        });


        res.status(200).json({
            message: 'QR obtenido correctamente',
            status: 200,
            data: {
                qrCode: Buffer.from(data, 'binary').toString('base64')
            }
        });

    } catch (error) {


        res.status(500).json(
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

        const { data } = await axiosInstance.get('instance/status');

        res.status(200).json(
            {
                message: 'QR obtenido correctamente',
                status: 200,
                data
            });

    } catch (error) {

        res.status(500).json(
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

        const { data } = await axiosInstance.get('instance/logout', { token });

        res.status(200)
            .json(
                {
                    message: 'Sesión Cerrada Correctamente',
                    status: 200,
                    data
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

app.post('/config', async (req, res) => {

    try {

        const { sendDelay, webhookURL, onReceived, onCreated, onACK } = req.body;

        const { data } = await axiosInstance.post('instance/settings', {
            token,
            sendDelay,
            webhook_url: webhookURL,
            webhook_message_received: onReceived,
            webhook_message_create: onCreated,
            webhook_message_ack: onACK
        });

        res.status(200)
            .json(
                {
                    message: 'Configuración Realizada correctamente',
                    status: 200,
                    data
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

        const { data } = await axiosInstance.post('messages/chat', { token, to, body });

        res.status(200)
            .json(
                {
                    message: 'Chats obtenidos correctamente',
                    status: 200,
                    data
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
app.post('/getMessages', async (req, res) => {

    const { page, limit, status, sort } = req.body;

    try {

        axiosInstance.params = {
            token,
            page,
            limit,
            status,
            sort
        }

        const { data } = await axiosInstance.get('messages');

        res.status(200)
            .json(
                {
                    message: 'Mensajes obtenidos correctamente',
                    status: 200,
                    data
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

        const { data } = await axiosInstance.get('chats');

        res.status(200)
            .json(
                {
                    message: 'Chats obtenidos correctamente',
                    status: 200,
                    data
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