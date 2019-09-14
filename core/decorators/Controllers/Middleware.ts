import { RequestHandler } from 'express';

export const Middleware = (middleware: RequestHandler | RequestHandler[]): MethodDecorator => {
  return (target: Object, propertyKey?: string | symbol) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
    if (!routeProperties) {
      routeProperties = {};
    }

    routeProperties = {
      routeMiddleware: middleware,
      ...routeProperties
    }

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  };
}