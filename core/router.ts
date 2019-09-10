import express from 'express';
import chalk from 'chalk';

import { RouteDefinition } from './models/RouteDefinition';

export const Router = (app: any, controllers: any[]): void => {
  console.log(chalk.yellow(`\nLoading routes`));

  controllers.forEach(controller => {
    const instance: any = new controller();
    const prefix: string = Reflect.getMetadata('prefix', controller);
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);

    routes.forEach(route => {
      if (route.requestMethod) {
        const middlewares = route.middleware || [];

        app[route.requestMethod](`${prefix + route.path}`, middlewares, (req: express.Request, res: express.Response) => {
          instance[route.methodName](req, res);
        });

        console.log(chalk.yellow(`-> ${route.requestMethod.toUpperCase()} ${prefix + route.path}`));
      }
    });
  });
}