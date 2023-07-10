import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { messageTemplate } from './email-template.js';
import instanceRoute from './routes/employees.routes.js';
import messagesRoute from './routes/messages.routes.js';
import chatsRoute from './routes/chats.routes.js'
import contactsRoute from './routes/contacts.routes.js';
import webhookRoute from './routes/webhook.routes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/webhook', webhookRoute)
app.use('/instance', instanceRoute);
app.use('/messages', messagesRoute);
app.use('/chats', chatsRoute);
app.use('/contacts', contactsRoute);


export default app;