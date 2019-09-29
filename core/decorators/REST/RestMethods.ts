export type httpVerbs = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export const Get = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('get', path, spec);

export const Post = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('post', path, spec);

export const Delete = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('delete', path, spec);

export const Options = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('options', path, spec);

export const Put = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('put', path, spec);

export const Patch = (path: string = '', spec: Object = {}): MethodDecorator => DecoratorFactory('patch', path, spec);

function DecoratorFactory(httpVerb: httpVerbs, path: string, spec: Object): MethodDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    spec = {
      [path ? (path) : '/']: {
        [httpVerb]: { ...spec }
      }
    };

    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    routeProperties = {
      ...routeProperties,
      httpVerb,
      path: path ? (path) : '',
      pathSpec: spec
    }

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  }
}