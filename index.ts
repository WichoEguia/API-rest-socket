import { SERVER_PORT, DB_URL } from './global/global';
import Server from './classes/Server';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';
import mongoose from 'mongoose';

const server = Server.instance;

// body-parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({
    origin: true,
    credentials: true
}));

// RUTAS
server.app.use('/', router);

// Conexion a base de datos
mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) console.error(err);
    console.log('Conectado a base de datos');
});

server.start(() => {
    console.log(`Escuchando el servidor en el puerto ${SERVER_PORT}`);
});