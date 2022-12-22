import * as express from 'express';
const routes = express.Router();

import * as swaggerUi from 'swagger-ui-express';
import openapiSpec from '../../swagger.config';

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

export default routes;
