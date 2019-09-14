import { Application, Request, Response, Router, NextFunction } from 'express';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import chalk from 'chalk';

// Importando funciones del archivo socket.ts
import { RouteDefinition } from './models/RouteDefinition';
import * as socket from '../app/sockets/socket';

type Controller = InstanceType<any>;
type RouterLib = ((options?: any) => any);

interface IRouterAndPath {
    basePath: string | null;
    router: Router | null;
}

export default class Server {
    private static _instance: Server;

    public port: number;
    public app: any;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        // Se hace que el constructor sea private para que al
        // llamar el servidor no reinicie el socket
        this.port = Number(process.env.PORT);
        this.app = express();

        // Para trabajar con socket.io se necesita un servidor http.
        // Para ello se crea un servidor http pasandole el servidor de express ya existente.
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    /**
     * Se crea una funcion para obtener la instancia del servidor si ya existe.
     * Si no existe instancia del servidor, se creara una nueva instancia.
     * 
     * @returns {Server} Instancia de la clase server.
     */
    public static get instance(): Server {
        return this._instance || (this._instance = new Server());
    }

    /**
     * Funcion encargada de escuchar todos los eventos de sockets.s
     */
    private escucharSockets() {
        this.io.on('connection', cliente => {
            // Conectar cliente.
            socket.clienteConectado(cliente, this.io);

            // Desconectar cliente.
            socket.clienteDesconectado(cliente, this.io);
        });
    }

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

        // Add paths/functions to router-object
        let members = Object.getOwnPropertyNames(controller);
        members = members.concat(Object.getOwnPropertyNames(prototype));
        members.forEach((member) => {
            const route = controller[member];
            const routeProperties = Reflect.getOwnMetadata(member, prototype);
            if (route && routeProperties) {
                const { routeMiddleware, httpVerb, path } = routeProperties;

                let callBack = (req: Request, res: Response, next: NextFunction) => {
                    return controller[member](req, res, next);
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
     * Levanta el servidor en el puerto especificado en el archivo de configuración.
     * 
     * @param {Function} callback Funcion que se llamara cuando se levante el servidor.
     */
    public start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}