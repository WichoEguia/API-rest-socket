import {
  RouteDefinition,
  requestMethods
} from '../../../models/RouteDefinition';

export const DecoratorFactory = (path: string, method: requestMethods): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    let routes: RouteDefinition[] = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    let route = routes.find((route) => route.methodName == propertyKey);
    if (route) {
      routes = routes.map(route => {
        route.requestMethod = method;
        route.path = path;

        return route;
      });
    } else {
      routes.push({
        requestMethod: method,
        path,
        methodName: <string>propertyKey
      });
    }

    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}