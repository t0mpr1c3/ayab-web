import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { json } from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import routes from './routes/';
import { dataSource } from './models/data-source.model';

const allowedOrigins = ['http://localhost:4200']; // AYAB frontend
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

dataSource.initialize()
  .then(() => {
    const app = express();

    // Set up middleware
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(json());

    // custom logger for requests
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.printf((info) => {
          console.log('req', info.meta.req);
          console.log('res', info.meta.res);
          return '';
        })
      ),
      requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
      responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
    }));
    app.use(morgan('dev'));
  
    // Set all routes from routes folder
    app.use('/', routes);
  
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });

    console.log('Data source has been initialized')
  })
  .catch(error => console.log(error));