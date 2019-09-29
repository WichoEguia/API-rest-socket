/**
 * Generate the spec object from
 * the Open Api 3.0 specification
 */
class SpecBuilder {
  private spec: Object;

  constructor() {
    this.spec = {
      openapi: "3.0.0",
      description: process.env.API_DESCRIPTION,
      info: {
        version: process.env.API_VERSION,
        title: process.env.API_NAME
      }
    };
  }

  /**
   * Get the spec object
   * 
   * @returns Spec object
   */
  public getSpec() {
    return this.spec;
  }

  /**
   * Add nodes to spec object
   * 
   * @param parentNode Parent node where will be appened the data
   * @param newNode New data to add to the spec
   */
  private addData(parentNode: Object = { ...this.spec }, newNode: Object) {
    this.spec = {
      ...parentNode,
      newNode
    }
  }
}