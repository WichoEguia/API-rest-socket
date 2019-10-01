export const PARAMETERS_TOKEN_TEST_PARAMS = {
  "name": "id",
  "in": "path",
  "description": "The token identifier string",
  "required": true,
  "schema": {
    "type": "string"
  }
};

export const PARAMETERS_ID_TEST_PARAMS = {
  "name": "id",
  "in": "path",
  "description": "The token identifier string",
  "required": true,
  "schema": {
    "type": "string"
  }
};

export const REQUESTBODY_FROM_TEST_REQUESTBODY = {
  "content": {
    "application/json": {
      "schema": {
        "type": 'object',
        "properties": {
          "id": {
            "description": "Identifier for user",
            "readOnly": true,
            "type": "string"
          },
          "name": {
            "description": "Name of the user",
            "type": "string",
            "example": "Luis"
          },
          "age": {
            "description": "Age of the user",
            "type": "number",
            "example": 22
          }
        }
      }
    }
  },
  "description": "Body request resource",
  "required": true
};