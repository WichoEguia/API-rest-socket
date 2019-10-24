import fs from 'fs';
import { httpVerbs } from './RestMethods';

/**
 * Generate the spec object from
 * the Open Api 3.0 specification
 */
class SpecBuilder {
  private spec: any = {
    openapi: '3.0.0',
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
   * Generate a JSON file with the generated spec
   */
  public generateSpec(cb: Function) {
    fs.writeFile('public/API/spec.json', JSON.stringify(this.spec), err => {
      if (err) console.log(err);
      cb();
    });
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
    };

    if (!this.spec.paths.hasOwnProperty(path)) {
      this.spec.paths[path] = { ...spec[path] };
    } else {
      if (!this.spec.paths[path].hasOwnProperty(method)) {
        this.spec.paths[path][method] = { ...spec[path] };
      }
    }
  }

  /**
   * Add parameters to path in the global spec
   *
   * @param path Path that belongs the parameter
   * @param spec Info of the parameter
   */
  public addParamsSpec(path: string, spec: any, type: string, method: string) {
    switch (type) {
      case 'QUERY_PARAM':
      case 'PARAM':
      case 'HEADER':
        this.spec.paths[path][method]['parameters'] =
          this.spec.paths[path][method]['parameters'] || [];
        this.spec.paths[path][method]['parameters'] = [
          ...this.spec.paths[path][method]['parameters'],
          spec
        ];
        break;

      case 'BODY':
        this.spec.paths[path][method]['requestBody'] = spec;
        break;
    }
  }
}

export const specBuilder = new SpecBuilder();
