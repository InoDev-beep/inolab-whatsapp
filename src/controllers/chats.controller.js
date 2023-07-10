import { axiosInstance } from "../api/api.js";

/**
 * @description GET CHATS
 * @param token  Ultramsg Token
 * @param page   Pagination page number
 * @param limit  Number of messages per request
 * @param status Messages status [sent , queue , unsent , invalid, all]
 * @param sort   asc : sorted messages by ID from smallest to largest .
 *               desc : sorted messages by ID from largest to smallest
 */

export const getChats = async (req, res) => {
  try {

    const { data } = await axiosInstance.get("chats");

    res.status(200).json({
      message: "Chats obtenidos correctamente",
      status: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener los chats",
      status: 500,
      data: error,
    });
  }
};


/**
 * @description GET CHATS ID'S
 * @param clear  bool (true/false)
 */


export const getChatsIds = async (req, res) => {
  try {

    axiosInstance.params = { clear: true };

    const { data } = await axiosInstance.get("chats/ids");

    res.status(200).json({
      message: "Chats Ids obtenidos correctamente",
      status: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener los Chats Ids",
      status: 500,
      data: error,
    });
  }
};

/**
 * @description GET CHATS MESSAGES
 * @param token  Ultramsg Token
 * @param chatId chatID for contact or group e.g 14155552671@c.us or 14155552671-441234567890@g.us
 * @param limit  Number of messages per request
 */

export const getChatsMessages = async (req, res) => {
    try {

      const { chatId, limit } = req.body;
      axiosInstance.params = { chatId,  limit};

      const { data } = await axiosInstance.get("chats/messages");
  
      res.status(200).json({
        message: "Chats Ids obtenidos correctamente",
        status: 200,
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error al obtener los Chats Ids",
        status: 500,
        data: error,
      });
    }
  };