import { axiosInstance } from "../api/api.js";
import { TOKEN } from "../config.js";

/**
 * @description LOGIN
 * @param token  Ultramsg Token
 */

export const login = async (req, res) => {

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

}

/**
 * @description GET STATUS
 * @param token  Ultramsg Token
 */

export const getInstanceStatus = async (req, res) => {

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

}


/**
 * @description LOGOUT
 * @param token  Ultramsg Token
 */

export const logout = async (req, res) => {

    try {

        const { data } = await axiosInstance.get('instance/logout', { token:  TOKEN});

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

}


/**
 * @description CONFIG INSTANCE
 * @param token  Ultramsg Token
 * @param sendDelay Delay in seconds between sending message, Default 1
 * @param webhook_url Http or https URL for receiving notifications .
 * @param webhook_message_received  true/false notifications in webhooks when message received.
 * @param webhook_message_create true/false notifications in webhooks when message create.
 * @param webhook_message_ack true/false ack (message delivered and message viewed) notifications in webhooks.
 */

export const config = async (req, res) => {

    try {

        const { sendDelay, webhookURL, onReceived, onCreated, onACK } = req.body;

        const { data } = await axiosInstance.post('instance/settings', {
            token: TOKEN,
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

        console.log(error);

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un problema al guardar la configuración',
                    status: 500,
                    data: error
                });

    }

}
