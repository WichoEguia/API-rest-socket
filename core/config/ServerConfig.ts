import chalk from 'chalk';
import { RouterLib, Controller, IRouterAndPath } from '../Server';
import { Request, Response, NextFunction } from 'express';

export default class ServerConfig {
    constructor() {
        console.log(chalk.bgBlue('\nSTARTING SERVER...'));

        // PORT
        process.env.PORT = '3000';

        // URL database
        let database = '';
        process.env.DB_URL = `mongodb://localhost:27017/${database}`;

        // Expiration token
        process.env.CADUCIDAD_TOKEN = '48h';

        // Token seed
        process.env.SEED = 'este-es-el-seed-desarrollo';

        // Proyect name
        process.env.API_NAME = 'WAPI EXAMPLE';

        // Version
        process.env.API_VERSION = '1.0.0';

        // Description
        process.env.API_DESCRIPTION = 'Api de prueba WAPI';
    }

    /**
     * Get data of the routes in the controller
     *
     * @param routerLibrary Custom library to manage routes
     * @param controller Instance of the controller to be processed
     */
    protected getRouter(routerLibrary: RouterLib, controller: Controller): IRouterAndPath {
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
                    let result = controller[member]();
                    res.json({
                        result
                    });
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
}