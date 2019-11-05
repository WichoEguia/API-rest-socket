import chalk from 'chalk';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import path from 'path';

import Server from './core/Server';

import { specBuilder } from './core/SpecBuilder';

import { TestController } from './app/controllers/TestController';
import { MainController } from './app/controllers/MainController';

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
server.app.use(
  cors({
    origin: true,
    credentials: true
  })
);

server.addControllers([new MainController(), new TestController()]);

// Serve static files
server.app.use(express.static('public'));

// Generating spec json
specBuilder.generateSpec(() => {
  server.app.get('/explorer', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../public/API/index.html'));
  });
});

server.start(() => {
  console.log(
    chalk.yellowBright(
      `\nEscuchando el servidor en el puerto ${process.env.PORT}\n`
    )
  );
});
