import { Router } from "express";
import { webhook, getAllMessages } from "../controllers/webhook.controller.js";

const router = Router();

router.post('/webhook', webhook);

router.get('/getAllMessages', getAllMessages)

export default router;