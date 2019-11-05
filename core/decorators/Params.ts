import { TYPES } from './../constants/Types';

export const Req = (): ParameterDecorator => {
  return InjectParam(TYPES.REQUEST, (req: any) => req);
};

export const Res = (): ParameterDecorator => {
  return InjectParam(TYPES.RESPONSE, (res: any) => res);
};

export const Body = (spec: Object = {}): ParameterDecorator => {
  return InjectParam(TYPES.BODY, (req: any) => req.body, spec);
};

export const QueryParam = (
  prop?: string | null,
  spec: Object = {}
): ParameterDecorator => {
  return InjectParam(
    TYPES.QUERY_PARAM,
    (req: any) => {
      if (!prop) return req.query;
      return req.query[prop];
    },
    spec
  );
};

export const QueryParams = (spec: Object = {}): ParameterDecorator => {
  return QueryParam(null, spec);
};

export const Param = (
  prop?: string | null,
  spec: Object = {}
): ParameterDecorator => {
  return InjectParam(
    TYPES.PARAM,
    (req: any) => {
      if (!prop) return req.params;
      return req.params[prop];
    },
    spec
  );
};

export const Params = (spec: Object = {}): ParameterDecorator => {
  return Param(null, spec);
};

export const Header = (
  prop?: string | null,
  spec: Object = {}
): ParameterDecorator => {
  return InjectParam(
    TYPES.HEADER,
    (req: any) => {
      if (!prop) return req.headers;
      return req.get(prop);
    },
    spec
  );
};

export const Headers = (spec: Object = {}): ParameterDecorator => {
  return Header(null, spec);
};

export function InjectParam(
  type: Symbol | string,
  fn: Function,
  spec?: Object
): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target) || {};

    if (!routeProperties.hasOwnProperty('params')) routeProperties.params = [];

    let param: any = { index, fn, type };
    if (spec) param = { ...param, spec };

    routeProperties.params.push(param);

    Reflect.defineMetadata(propertyKey, routeProperties, target);
  };
}
