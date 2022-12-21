import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

const server = express();
dotenv.config();

server.use(bodyParser.json({ strict: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', process.env.PORT || 9001);

server.listen(server.get('port'), () => {
  console.log(`Server is listening on port: ${server.get('port')}`);
});
