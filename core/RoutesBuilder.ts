import chalk from 'chalk';
import { RouterLib, Controller, IRouterAndPath } from './Server';
import { Request, Response, NextFunction } from 'express';

import { TYPES } from './constants/Types';
import { specBuilder } from './SpecBuilder';

export default class RoutesBuilder {
  constructor() {
    console.log(chalk.blue('\nLOADING ROUTES...'));
  }

  /**
   * Get data of the routes in the controller
   *
   * @param routerLibrary Custom library to manage routes
   * @param controller Instance of the controller to be processed
   */
  public getRouter(
    routerLibrary: RouterLib,
    controller: Controller
  ): IRouterAndPath {
    let router = routerLibrary();

    const prototype = Object.getPrototypeOf(controller);
    const basePath = Reflect.getOwnMetadata(TYPES.BASE_PATH, prototype);
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
