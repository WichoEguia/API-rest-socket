let PARAMS_PREFIX: string = '$param';

export const Req = (): ParameterDecorator => {
  return Inject((req: any) => req);
}

export const Res = (): ParameterDecorator => {
  return Inject((res: any) => res);
}

export const Body = (): ParameterDecorator => {
  return Inject((req: any) => req.body);
}

export const QueryParam = (prop?: string): ParameterDecorator => {
  return Inject((req: any) => {
    if (!prop) return req.query;
    return req.query[prop];
  });
}

export const QueryParams = (): ParameterDecorator => {
  return QueryParam();
}

export const Param = (prop?: string): ParameterDecorator => {
  return Inject((req: any) => {
    if (!prop) return req.params;
    return req.params[prop];
  });
}

export const Params = (): ParameterDecorator => {
  return Param();
}

export function Inject(fn: Function): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    if (!routeProperties.hasOwnProperty('params'))
      routeProperties.params = [];

    routeProperties.params.push({ index, fn });
    Reflect.defineMetadata(propertyKey, routeProperties, target);
  }
}