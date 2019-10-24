export type httpVerbs = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export const Get = (path: string = '', spec: Object = {}): MethodDecorator =>
  RestFactory('get', path, spec);

export const Post = (path: string = '', spec: Object = {}): MethodDecorator =>
  RestFactory('post', path, spec);

export const Delete = (path: string = '', spec: Object = {}): MethodDecorator =>
  RestFactory('delete', path, spec);

export const Options = (
  path: string = '',
  spec: Object = {}
): MethodDecorator => RestFactory('options', path, spec);

export const Put = (path: string = '', spec: Object = {}): MethodDecorator =>
  RestFactory('put', path, spec);

export const Patch = (path: string = '', spec: Object = {}): MethodDecorator =>
  RestFactory('patch', path, spec);

function RestFactory(
  httpVerb: httpVerbs,
  path: string,
  spec: Object
): MethodDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    routeProperties = {
      ...routeProperties,
      httpVerb,
      path: path ? path : '',
      pathSpec: spec
    };

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  };
}
