import { Router } from "express";
import { webhookEvent, getAllMessages } from "../controllers/webhook.controller.js";

const router = Router();

router.post('/webhook', webhookEvent);

router.get('/getAllMessages', getAllMessages)

export default router;