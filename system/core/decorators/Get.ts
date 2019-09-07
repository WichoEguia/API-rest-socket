import { RouteDefinition } from '../models/RouteDefinition';

export const Get = (path: string): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      requestMethod: 'get',
      path,
      methodName: <string>propertyKey
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}