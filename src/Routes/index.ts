import * as express from 'express';
import { logger } from '../Services';

const routes = express.Router();

routes.get('/healthcheck', (req, res) => {
  const message = 'Healthcheck: Server is up and running';
  logger.info(message);
  res.status(200).send(message);
});

export default routes;
