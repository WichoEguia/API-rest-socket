import { TYPES } from './../constants/Types';

export const Controller = (path: string = ''): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(TYPES.BASE_PATH, '/' + path, target.prototype);
  };
};
