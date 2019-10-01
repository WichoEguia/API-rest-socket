export const Req = (): ParameterDecorator => {
  return Inject('REQUEST', (req: any) => req);
}

export const Res = (): ParameterDecorator => {
  return Inject('RESPONSE', (res: any) => res);
}

export const Body = (spec: Object = {}): ParameterDecorator => {
  return Inject('BODY', (req: any) => req.body, spec);
}

export const QueryParam = (prop?: string | null, spec: Object = {}): ParameterDecorator => {
  return Inject('QUERY_PARAM', (req: any) => {
    if (!prop) return req.query;
    return req.query[prop];
  }, spec);
}

export const QueryParams = (spec: Object = {}): ParameterDecorator => {
  return QueryParam(null, spec);
}

export const Param = (prop?: string | null, spec: Object = {}): ParameterDecorator => {
  return Inject('PARAM', (req: any) => {
    if (!prop) return req.params;
    return req.params[prop];
  }, spec);
}

export const Params = (spec: Object = {}): ParameterDecorator => {
  return Param(null, spec);
}

export function Inject(type: string, fn: Function, spec?: Object): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    if (!routeProperties.hasOwnProperty('params'))
      routeProperties.params = [];

    let param: any = { index, fn, type };
    if (spec) param = { ...param, spec };

    routeProperties.params.push(param);

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  }
}