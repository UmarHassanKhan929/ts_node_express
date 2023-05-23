/** Packages Import */
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/** Custom Import */
import { config } from './config/config.js';
import Logging from './library/logging.js';

/** Route Import */
import TaskRoutes from './routes/TaskRoutes.js';

/** Express App */
const app: Express = express();

/** Connect to Mongo DB */
mongoose
  .connect(config.mongo.url, {
    writeConcern: {
      w: 'majority'
    },
    retryWrites: true
  })
  .then(() => {
    Logging.info('Connected to MongoDB');
    StartServer();
  })
  .catch((err) => {
    Logging.error(`Error connecting to MongoDB: ${err}`);
  });

/** Start server if MongoDB is connected */
const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logging.info(`Incoming request: Method: ${req.method} - Path: ${req.path}`);

    res.on('finish', () => {
      Logging.info(`Outgoing response: Method: ${req.method} - Path: ${req.path} - Status: ${res.statusCode}`);
    });
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** API Headers */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATHC,DELETE,GET');
      return res.status(200).json({});
    }
    next();
  });

  /** Routes */
  app.use('/api/task', TaskRoutes);

  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Hello World'
    });
  });

  /** Error Handling */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error('Not Found');
    Logging.error(`Error: ${error.message}`);
    return res.status(404).json({
      message: error.message
    });
  });

  /** Listen */
  app.listen(config.server.port, () => {
    Logging.info(`Server is listening on port: ${config.server.port}`);
  });
};
