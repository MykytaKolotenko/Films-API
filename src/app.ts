import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import filmsRouter from 'routes/films';
import { IError } from 'helpers/errorGenerator';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/films', filmsRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { message = 'Server error', status = 500 } = err;

  res.status(status).json({ message });
});

export default app;
