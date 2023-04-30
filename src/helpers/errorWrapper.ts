import { Request, Response, NextFunction } from 'express';
import errorGenerator from './errorGenerator';

interface IControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const assyncWrapper = (controller: IControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch((error) => {
      error?.code
        ? next(errorGenerator(error?.code, error.message))
        : next(errorGenerator(error?.status, error.message));
    });
  };
};

export default assyncWrapper;
