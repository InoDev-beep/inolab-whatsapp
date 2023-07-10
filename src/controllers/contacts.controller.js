import { axiosInstance } from "../api/api.js";

/**
 * @description GET CONTACTS
 * @param token  Ultramsg Token
 */

export const getContacts = async (req, res) => {


    try {

        const { data } = await axiosInstance.get('contacts');

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


}


/**
 * @description GET CONTACT
 * @param token  Ultramsg Token
 */

export const getContact = async (req, res) => {


    try {

        const { data } = await axiosInstance.get('contacts/contact');

        res.status(200)
            .json(
                {
                    message: 'Contacto Obtenido Correctamente',
                    status: 200,
                    data
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al obtener el contacto',
                    status: 500,
                    data: error
                });

    }


}


/**
 * @description GET CONTACTS
 * @param token  Ultramsg Token
 */

export const getContactsIDS = async (req, res) => {


    try {

        const { data } = await axiosInstance.get('contacts/ids');

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


}

export const checkContact = async (req, res) => {


    try {

        const { data } = await axiosInstance.get('contacts/check');

        res.status(200)
            .json(
                {
                    message: 'Contacto Encontrado',
                    status: 200,
                    data
                });

    } catch (error) {

        res.status(500)
            .json(
                {
                    message: 'Ocurrió un error al buscar el contacto',
                    status: 500,
                    data: error
                });

    }


}



