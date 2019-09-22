import express, { Application, Request, Response, Router, NextFunction } from 'express';
import socketIO from 'socket.io';
import http from 'http';
import chalk from 'chalk';

import ServerConfig from './config/ServerConfig';

import * as socket from '../app/sockets/socket';

export type Controller = InstanceType<any>;
export type RouterLib = ((options?: any) => any);

export interface IRouterAndPath {
    basePath: string | null;
    router: Router | null;
}

export default class Server extends ServerConfig{
    private static _instance: Server;

    public port: number;
    public app: Application;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        super();

        this.port = Number(process.env.PORT);
        this.app = express();

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.socketListener();
    }

    /**
     * Get server instance
     * Create one if no exists
     * 
     * @returns Server instance
     */
    public static get instance(): Server {
        return this._instance || (this._instance = new Server());
    }

    /**
     * Initialize the socket listener
     */
    private socketListener() {
        this.io.on('connection', cliente => {
            // Connected client
            socket.connectedClient(cliente, this.io);

            // Disconnected client
            socket.disconnectedClient(cliente, this.io);
        });
    }

    /**
     * Add and process the controllers to create the router
     * 
     * @param controllers Array of instances of controllers to serve
     * @param routerLib Custom library to manage routes
     */
    public addControllers(controllers: Controller | Controller[], routerLib?: RouterLib): void {
        controllers = (controllers instanceof Array) ? controllers : [controllers];
        const routerLibrary = routerLib || Router;
            controllers.forEach((controller: Controller) => {
            if (controller) {
                const { basePath, router } = this.getRouter(routerLibrary, controller);
                if (basePath && router) {
                    this.app.use(basePath, router);
                }
            }
        });
    }

    /**
     * Launch the server in the configuration port
     * 
     * @param callback
     */
    public start(callback: any): void {
        this.httpServer.listen(this.port, callback);
    }
}