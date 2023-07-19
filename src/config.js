import { config } from 'dotenv';

config();

export const PORT  = process.env.PORT || 3000
export const instanceId =  process.env.INSTANCE_ID || 'instance54883';
export const token =  process.env.ULT_TOKEN ||'mui1s6wckkgpnm5t';