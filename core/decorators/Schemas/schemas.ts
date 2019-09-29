const Schema = (name: string): ClassDecorator => {
  return (target: Object) => {
    let spec = {
      [name]: {
        type: 'Object'
      }
    };

    Reflect.defineMetadata('SCHEMA', spec, target);
  }
}

const Property = (spec?: Object): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    spec = {
      [propertyKey]: { ...spec }
    };

    Reflect.defineMetadata(propertyKey, spec, target);
  }
}

const Required = (): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    let requiredProperties = Reflect.getOwnMetadata('REQUIRED_PROPERTIES', target) || [];

    if (requiredProperties.includes(propertyKey))
      requiredProperties.push(propertyKey);

    Reflect.defineMetadata('REQUIRED_PROPERTIES', requiredProperties, target);
  }
}