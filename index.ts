import Server from './libraries/Server';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes';
import Config from './config/config';
import MySQL from './libraries/Mysql';
// import MongoDB from './libraries/Mongo';

// Inicializando configuración
new Config();

// Iniciando servidor
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
MySQL.instance;
// MongoDB.instance;


server.start(() => {
    console.log(`Escuchando el servidor en el puerto ${process.env.PORT}`);
});