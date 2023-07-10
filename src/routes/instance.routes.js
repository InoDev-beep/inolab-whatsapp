import { Router } from "express";
import { login, getInstanceStatus, logout, config } from "../controllers/instance.controller.js";

const router = Router();

router.get('/login', login);

router.get('/getInstanceStatus', getInstanceStatus);

router.get('/logout', logout);

router.post('/config', config);

export default router;