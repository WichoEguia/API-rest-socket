import chalk from 'chalk';

import bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import 'reflect-metadata';

import Config from './core/config/config';
import Server from './core/Server';

import { MainController } from './app/controllers/MainController';
import { responseHandler } from './core/response_handler';

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
server.app.get('/', (req: Request, res: Response) => {
    res.end(
        `API rest por Luis Eguias ${new Date().getFullYear()}.`
    );
});

server.addControllers(new MainController());

// Error catching
responseHandler(server.app);

// Conexion a base de datos Mongo o MySQL

// Iniciar servidor
server.start(() => {
    console.log(chalk.green(`\nEscuchando el servidor en el puerto ${process.env.PORT}...\n`));
});