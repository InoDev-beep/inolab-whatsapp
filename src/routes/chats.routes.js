import { Router } from "express";
import { getChats, getChatsIds, getChatsMessages } from "../controllers/chats.controller.js";

const router = Router();

router.get('/getChats', getChats);

router.get('/getChatsIds', getChatsIds);

router.post('/getChatsMessages', getChatsMessages);

export default router;