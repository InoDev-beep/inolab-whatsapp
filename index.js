import app from "./src/app";
import { PORT } from './src/config';

app.listen(PORT);
console.log(`Servidor iniciado en el puerto ${PORT}`);