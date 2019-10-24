export const Controller = (path: string = ''): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata('BASE_PATH', '/' + path, target.prototype);
  };
}