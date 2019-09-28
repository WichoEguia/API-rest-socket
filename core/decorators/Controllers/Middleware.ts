import { RequestHandler } from 'express';

export const Middleware = (middleware: RequestHandler | RequestHandler[]): MethodDecorator => {
  return (target: Object, propertyKey?: string | symbol) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    routeProperties = {
      routeMiddleware: middleware,
      ...routeProperties
    }

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  };
}