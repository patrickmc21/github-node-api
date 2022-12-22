import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as loggerMiddleware from 'morgan';

import routes from './Routes';
import { logger } from './Services';

const server = express();
dotenv.config();

server.use(loggerMiddleware('dev'));
server.use(bodyParser.json({ strict: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', process.env.PORT || 9001);
server.use('/', routes);

server.listen(server.get('port'), () => {
  logger.info(`Server is listening on port: ${server.get('port')}`);
});
