import { Application, Request, Response, Router, NextFunction } from 'express';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import chalk from 'chalk';

// Import socket events
import * as socket from '../app/sockets/socket';
import { CallHandler } from './CallHandler';

type Controller = InstanceType<any>;
type RouterLib = ((options?: any) => any);

interface IRouterAndPath {
    basePath: string | null;
    router: Router | null;
}

export default class Server {
    private static _instance: Server;

    public port: number;
    public app: Application;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
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
        const routerLibrary = routerLib || express.Router;
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
     * Get data of the routes in the controller
     * 
     * @param routerLibrary Custom library to manage routes
     * @param controller Instance of the controller to be processed
     */
    private getRouter(routerLibrary: RouterLib, controller: Controller): IRouterAndPath {
        let router = routerLibrary();

        const prototype = Object.getPrototypeOf(controller);
        const basePath = Reflect.getOwnMetadata('BASE_PATH', prototype);
        if (!basePath) {
            return {
                basePath: null,
                router: null,
            };
        }

        let members = Object.getOwnPropertyNames(controller);
        members = members.concat(Object.getOwnPropertyNames(prototype));
        members.forEach((member) => {
            const route = controller[member];
            const routeProperties = Reflect.getOwnMetadata(member, prototype);
            if (route && routeProperties) {
                const { routeMiddleware, httpVerb, path } = routeProperties;

                let callBack = (req: Request, res: Response, next: NextFunction) => {
                    return CallHandler(req, res, next, controller[member], this.app);
                };

                if (routeMiddleware) {
                    router[httpVerb](path, routeMiddleware, callBack);
                } else {
                    router[httpVerb](path, callBack);
                }

                console.log(chalk.yellow(`-> ${httpVerb.toUpperCase()} ${basePath + path}`));
            }
        });

        return {
            basePath,
            router,
        };
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