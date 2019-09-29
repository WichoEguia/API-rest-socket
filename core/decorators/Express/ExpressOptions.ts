let PARAMS_PREFIX: string = '$param';

export const Req = (): ParameterDecorator => {
  return Inject((req: any) => req);
}

export const Res = (): ParameterDecorator => {
  return Inject((res: any) => res);
}

export const Body = (spec: Object = {}): ParameterDecorator => {
  return Inject((req: any) => req.body, spec);
}

export const QueryParam = (spec: Object = {}, prop?: string): ParameterDecorator => {
  return Inject((req: any) => {
    if (!prop) return req.query;
    return req.query[prop];
  }, spec);
}

export const QueryParams = (spec: Object = {}): ParameterDecorator => {
  return QueryParam(spec);
}

export const Param = (spec: Object = {}, prop?: string): ParameterDecorator => {
  return Inject((req: any) => {
    if (!prop) return req.params;
    return req.params[prop];
  }, spec);
}

export const Params = (spec: Object = {}): ParameterDecorator => {
  return Param(spec);
}

export function Inject(fn: Function, spec?: Object): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    if (!routeProperties.hasOwnProperty('params'))
      routeProperties.params = [];

    let param: any = { index, fn };
    if (spec) param = { ...param, spec };

    routeProperties.params.push(param);

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  }
}