import { Router } from "express";
import { webhookEvent, getAllMessages } from "../controllers/webhook.controller.js";

const router = Router();

router.post('/webhookEvent', webhookEvent);

router.get('/getAllMessages', getAllMessages)

export default router;