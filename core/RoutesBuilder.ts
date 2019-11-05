import chalk from 'chalk';
import { RouterLib, Controller, IRouterAndPath } from './Server';
import { Request, Response, NextFunction } from 'express';

import { specBuilder } from './SpecBuilder';

export default class ServerConfig {
  constructor() {
    console.log(chalk.blue('\nSTARTING SERVER...'));

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
    process.env.API_NAME = 'EAPI';

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
  protected getRouter(
    routerLibrary: RouterLib,
    controller: Controller
  ): IRouterAndPath {
    let router = routerLibrary();

    const prototype = Object.getPrototypeOf(controller);
    const basePath = Reflect.getOwnMetadata('BASE_PATH', prototype);
    if (!basePath) {
      return {
        basePath: null,
        router: null
      };
    }

    let members = Object.getOwnPropertyNames(controller);
    members = members.concat(Object.getOwnPropertyNames(prototype));
    members.forEach(member => {
      const route = controller[member];
      const routeProperties = Reflect.getOwnMetadata(member, prototype);
      if (route && routeProperties) {
        const {
          routeMiddleware,
          httpVerb,
          path,
          params,
          pathSpec
        } = routeProperties;

        // Add routes and params to spec
        specBuilder.addPathSpec(path, httpVerb, pathSpec);

        if (params) {
          params.forEach((param: any) => {
            specBuilder.addParamsSpec(path, param.spec, param.type, httpVerb);
          });
        }

        let callBack = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          let args = this.getArguments(params, req, res, next);
          const result = controller[member](...args);

          if (result) {
            let data = await result;

            if (typeof data === 'object') {
              res.json(data);
            } else {
              res.send(data);
            }
          }
        };

        if (routeMiddleware) {
          router[httpVerb](path, routeMiddleware, callBack);
        } else {
          router[httpVerb](path, callBack);
        }

        console.log(
          `${chalk.magenta('- ' + httpVerb.toUpperCase())} ${chalk.yellow(
            basePath + path
          )}`
        );
      }
    });

    return { basePath, router };
  }

  private getArguments(
    params: any[],
    req: Request,
    res: Response,
    next: NextFunction
  ): any[] {
    let args = [req, res, next];

    if (params) {
      args = [];
      params.sort((a: any, b: any) => a.index - b.index);
      params.forEach((param: any) => {
        let result;
        if (param !== undefined) result = param.fn(req);

        args.push(result);
      });
    }

    return args;
  }
}
