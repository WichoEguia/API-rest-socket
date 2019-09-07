import express from 'express';
import chalk from 'chalk';

import { RouteDefinition } from "./core/models/RouteDefinition";
import MainController from "../controllers/MainController";

export const Router = (app: any) => {
  console.log(chalk.blueBright(`\nLoading routes`));

  [MainController].forEach(controller => {
    const instance: any = new controller();
    const prefix: string = Reflect.getMetadata('prefix', controller);
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);

    routes.forEach(route => {
      app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response) => {
        instance[route.methodName](req, res);
      });

      console.log(chalk.blueBright(`-> ${route.requestMethod.toUpperCase()} ${prefix + route.path}`));
    });
  });
}