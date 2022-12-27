import * as express from 'express';
import { logger } from '../Services';
import swaggerRoutes from './swagger.routes';
import gitHubRoutes from './github.routes';

const routes = express.Router();

routes.use('/', swaggerRoutes);
routes.use('/github', gitHubRoutes);

/**
 * @openapi
 * /healthcheck:
 *  get:
 *    description: Server healthcheck
 *    responses:
 *      200:
 *        description: Returns success when server is up and running
 */
routes.get('/healthcheck', (req, res) => {
  const message = 'Healthcheck: Server is up and running';
  logger.info(message);
  res.status(200).send(message);
});

export default routes;
