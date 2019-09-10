import { RouteDefinition } from '../../models/RouteDefinition';

export const Get = (path: string): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    let routes: RouteDefinition[] = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    let route = routes.find((route) => route.methodName == propertyKey);
    if (route) {
      routes = routes.map(route => {
        route.requestMethod = 'get';
        route.path = path;

        return route;
      });
    } else {
      routes.push({
        requestMethod: 'get',
        path,
        methodName: <string>propertyKey
      });
    }

    Reflect.defineMetadata('routes', routes, target.constructor);
  }
}