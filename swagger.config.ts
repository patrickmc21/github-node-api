import * as swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Github Node API',
      version: '1.0.0',
    },
  },
  apis: ['./src/Routes/*.ts'],
};

export default swaggerJsDoc(options);
