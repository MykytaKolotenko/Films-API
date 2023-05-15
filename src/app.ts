import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import filmsRouter from './routes/films';
import { CustomError } from './helpers/errorGenerator';
import authRouter from './routes/auth';

const app = express();

app.use(logger('common'));
app.use(cors());
app.use(express.json());

app.use('/api/films', filmsRouter);
app.use('/user', authRouter);

app.use((_req: Request, res: Response) => {
  return res.status(404).json({ message: 'Not found' });
});

app.use(
  (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const { message = 'Server error', status = 500 } = err;

    res.status(status).json({ message });
  }
);

export default app;
