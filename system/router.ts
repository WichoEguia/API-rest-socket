import { RouteDefinition } from "./core/models/RouteDefinition";
import express from 'express';

import MainController from "../controllers/MainController";

export const Router = (app: any) => {
  [MainController].forEach(controller => {
    const instance: any = new controller();
    const prefix: string = Reflect.getMetadata('prefix', controller);
    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);

    routes.forEach(route => {
      app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response) => {
        instance[route.methodName](req, res);
      });

      console.log(`Loaded route ${prefix + route.path}`);
    });
  });
}