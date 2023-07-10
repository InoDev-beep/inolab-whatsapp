import { axiosInstance } from "../api/api.js";

/**
 * @description CREATE NEW MESSAGE
 * @param token  Ultramsg Token
 * @param to     Phone with international format e.g +52
 * @param body   Message text, Max length : 4096 characters.
 */

export const newMessage = async (req, res) => {
  const { to, body } = req.body;

  try {
    const { data } = await axiosInstance.post("messages/chat", {
      token,
      to,
      body,
    });

    res.status(200).json({
      message: "Mensaje enviado correctamente",
      status: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un problema al enviar el mensaje",
      status: 500,
      data: error,
    });
  }
};

/**
 * @description GET MESSAGES
 * @param token  Ultramsg Token
 * @param page   Pagination page number
 * @param limit  Number of messages per request
 * @param status Messages status [sent , queue , unsent , invalid, all]
 * @param sort   asc : sorted messages by ID from smallest to largest .
 *               desc : sorted messages by ID from largest to smallest
 */

export const getMessages = async (req, res) => {
  const { page, limit, status, sort } = req.body;

  try {
    axiosInstance.params = {
      token,
      page,
      limit,
      status,
      sort,
    };

    const { data } = await axiosInstance.get("messages");

    res.status(200).json({
      message: "Mensajes obtenidos correctamente",
      status: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener los mensajes",
      status: 500,
      data: error,
    });
  }
};
