export const RESPONSE_TEST_PARAMS = {
  description: 'Test with params response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            description: 'Identificator',
            type: 'string'
          },
          token: {
            description: 'Generic token',
            type: 'string'
          }
        }
      }
    }
  }
};

export const RESPONSE_TEST_REQUESTBODY = {
  description: 'Test with request body',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            description: 'Identificator',
            type: 'string'
          },
          name: {
            description: 'Name of the user',
            type: 'string'
          },
          age: {
            description: 'Age of the user',
            type: 'number'
          }
        }
      }
    }
  }
};