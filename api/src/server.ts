import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import apiRouter from '@/routes';
import logger from '@/shared/logger';

import '@/startup';
import createBasicResponse from '@/shared/basicResponse';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', apiRouter);

app.use((_req, res) => {
    res.status(404).json({error: 'Not Found'});
});

// Print API errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.err(err, true);
    return res.status(500).json(createBasicResponse(500));
});

// Export express instance
export default app;
