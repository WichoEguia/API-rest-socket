import { DecoratorFactory } from './helpers/DecoratorFactory';

export const Get = (path: string): MethodDecorator => DecoratorFactory(path, 'get');

export const Post = (path: string): MethodDecorator => DecoratorFactory(path, 'post');

export const Delete = (path: string): MethodDecorator => DecoratorFactory(path, 'delete');

export const Options = (path: string): MethodDecorator => DecoratorFactory(path, 'options');

export const Put = (path: string): MethodDecorator => DecoratorFactory(path, 'put');

export const Patch = (path: string): MethodDecorator => DecoratorFactory(path, 'patch');