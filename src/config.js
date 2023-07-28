import { config } from 'dotenv';

config();

export const PORT  = process.env.PORT || 3000
export const INSTANCE_ID =  process.env.INSTANCE_ID || 'instance54883';
export const TOKEN =  process.env.ULT_TOKEN ||'mui1s6wckkgpnm5t';
export const EMAIL_CONFIG = {
    host: 'smtp.inolab.com',
    port: 1025,
    secure: false,
    ignoreTLS: true,
    secureConnection: false,
    requiresAuth: false,
    auth: {
        user: 'noreply@inolab.com',
        pass: 'M_InolabMail22*'
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
}