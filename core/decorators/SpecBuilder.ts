import { httpVerbs } from './REST/RestMethods';

/**
 * Generate the spec object from
 * the Open Api 3.0 specification
 */
class SpecBuilder {
  private spec: any = {
    openapi: "3.0.0",
    description: 'bla bla bla',
    info: {
      version: '0.0.0',
      title: 'EAPI'
    },
    paths: {},
    components: {
      schemas: {}
    }
  };

  /**
   * Get the spec object
   * 
   * @returns Spec object
   */
  public getSpec() {
    return this.spec;
  }

  /**
   * Add spec of the path to the global spec
   * 
   * @param path Full path from the endpoint
   * @param method HTTP verb used for the call
   * @param spec Objet from the path
   */
  public addPathSpec(path: string, method: httpVerbs, spec: any) {
    spec = {
      [path]: {
        [method]: { ...spec }
      }
    }

    if (!this.spec.paths.hasOwnProperty(path)) {
      this.spec.paths[path] = { ...spec }
    } else {
      if (!this.spec.paths.path.hasOwnProperty(method)) {
        this.spec.paths[path][method] = { ...spec[path] }
      }
    }
  }
}

export const specBuilder = new SpecBuilder();