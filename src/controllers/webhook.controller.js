import { axiosInstance } from "../api/api.js";
import nodemailer from 'nodemailer';
import { messageTemplate } from '../email-template.js';
import { readFile, writeFile } from 'fs';
import { EMAIL_CONFIG } from "../config.js"; 

const saveData = (data) => {
    return new Promise((resolve, reject) => {
        writeFile('./messages.json', JSON.stringify(data), (error, data) => {
            if (error) return reject(error);
            resolve({
                status: 200,
                message: 'Registro guardado correctamente.'
            });
        });
    });
}

const getData = () => {
    return new Promise((resolve, reject) => {
        readFile('./messages.json', 'utf8', function (error, data) {
            if (error) return reject(error);
            resolve(JSON.parse(data));
        })
    });
}

export const webhookEvent = async (req, res) => {

    const { data } = req.body;
    const { id, from, pushname, body, time } = data;
    
    const phone = from.toString().split('@')[0];
    const jsonData = await getData();
    const { messages } = jsonData;

    const rows = [...messages, { id, from: phone, pushname, body, time }];
    const { status, message } = await saveData({ messages: rows});

    /*     
    //Se deshabilitó el envío de correo cuando se recibe un WhastApp.
    try {

        const transport = nodemailer.createTransport(EMAIL_CONFIG);
        const info = await transport.sendMail({
            from: 'noreply@inolab.com',
            to: 'josehernandez@inolab.com',
            subject: 'Nuevo Mensaje de WhatsApp',
            html: messageTemplate(phone, pushname, body),
        });

        console.log('Correo Enviado Correctamente');

    } catch (error) {
        
        console.log('Ocurrió un error al enviar el correo' + error);
    } 
    */

}


export const getAllMessages = async (req, res) => {

    try {

        const data = await getData();
        const { messages } = data;

        res.status(200).json({
            status: 200,
            message: 'Mensajes Obtenidos Correctamente',
            data: messages
        });

    } catch (error) {
        res.status(300).json({
            status: 300,
            message: error,
            data: []
        });
    }

}