export type httpVerbs = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export const Get = (path: string = ''): MethodDecorator => DecoratorFactory('get', path);

export const Post = (path: string = ''): MethodDecorator => DecoratorFactory('post', path);

export const Delete = (path: string = ''): MethodDecorator => DecoratorFactory('delete', path);

export const Options = (path: string = ''): MethodDecorator => DecoratorFactory('options', path);

export const Put = (path: string = ''): MethodDecorator => DecoratorFactory('put', path);

export const Patch = (path: string = ''): MethodDecorator => DecoratorFactory('patch', path);

const DecoratorFactory = (httpVerb: httpVerbs, path: string): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
    if (!routeProperties) {
      routeProperties = {};
    }

    routeProperties = {
      httpVerb,
      path: path ? (path) : '',
      ...routeProperties
    }

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  }
}