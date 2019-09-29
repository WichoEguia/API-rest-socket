import chalk from 'chalk';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import path from 'path';

import Server from './core/Server';
import { specBuilder } from './core/decorators/SpecBuilder';

import { TestController } from './app/controllers/TestController';

// Get server instanse
const server = Server.instance;

// body-parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Middleware to handle errors
server.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error(err.stack);
    res.status(500).json({ err });
});

// Configure CORS
server.app.use(cors({
    origin: true,
    credentials: true
}));

// Set main route
server.app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

server.addControllers(new TestController());
console.log(JSON.stringify(specBuilder.getSpec()));

// Space to set a database

server.start(() => {
    console.log(chalk.yellowBright(`\nEscuchando el servidor en el puerto ${process.env.PORT}\n`));
});