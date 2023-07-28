import { config } from 'dotenv';

config();

export const PORT  = process.env.PORT || 3000
export const INSTANCE_ID =  process.env.INSTANCE_ID || '';
export const TOKEN =  process.env.ULT_TOKEN ||'';
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