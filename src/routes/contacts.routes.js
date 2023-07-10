import { Router } from "express";
import { getContacts, getContact, getContactsIDS, checkContact } from "../controllers/contacts.controller.js";

const router = Router();

router.get('/getContacts', getContacts);

router.get('/getContactsIDS', getContactsIDS);

router.post('/getContact', getContact);

router.post('/checkContact', checkContact);

export default router;