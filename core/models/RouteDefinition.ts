import { RequestHandler } from 'express';

export type requestMethods = 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';

export interface RouteDefinition {
  path?: string;
  requestMethod?: requestMethods;
  methodName: string;
  middleware?: RequestHandler | RequestHandler[]
}