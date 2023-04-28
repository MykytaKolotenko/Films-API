import { Request, Response, NextFunction } from 'express';

interface IControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const assyncWrapper = (controller: IControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch((error) => {
      next(error);
    });
  };
};

export default assyncWrapper;
