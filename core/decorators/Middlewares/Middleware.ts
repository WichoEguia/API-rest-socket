import { RequestHandler } from 'express';
import { RouteDefinition } from '../../models/RouteDefinition';

export const Middleware = (middleware: RequestHandler | RequestHandler[]): MethodDecorator => {
  return (target: Object, propertyKey?: string | symbol) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    let routes: RouteDefinition[] = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
    routes.push({
      methodName: <string>propertyKey,
      middleware
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}