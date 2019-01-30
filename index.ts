import { SERVER_PORT } from './global/global';
import Server from './classes/Server';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';

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

server.start(() => {
    console.log(`Escuchando el servidor en el puerto ${SERVER_PORT}`);
});