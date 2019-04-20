import Server from './libraries/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';
import Config from './config/config';
import MySQL from './libraries/mysql';

// Inicializando configuración
new Config();

// Iniciando servidor
const server = Server.instance;

// body-parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({
    origin: true,
    credentials: true
}));

// RUTAS
server.app.use('/', router);

// Conexion a base de datos
MySQL.instance;

// Iniciar servidor
server.start(() => {
    console.log(`Escuchando el servidor en el puerto ${process.env.PORT}`);
});