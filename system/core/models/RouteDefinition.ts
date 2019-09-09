import { RequestHandler } from 'express';

export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  methodName: string;
  middleware?: RequestHandler | RequestHandler[]
}