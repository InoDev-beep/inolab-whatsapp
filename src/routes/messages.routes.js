import { Router } from "express";
import { newMessage, getMessages } from "../controllers/messages.controller.js";

const router = Router();

router.post('/createMessage', newMessage);

router.post('/getMessages', getMessages);


export default router;