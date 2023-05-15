import { NextFunction, RequestHandler, Response, Request } from 'express';
import errorGenerator from '../../helpers/errorGenerator';
import errorWrapper from '../../helpers/errorWrapper';
import Joi from 'joi';

interface IRequestHandler extends RequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const filmSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  date: Joi.date().max(Date.now()).required()
});

const validateData: IRequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = filmSchema.validate(req.body);

  if (error) {
    throw errorGenerator(400, error.message);
  } else {
    next();
  }
};

export default errorWrapper(validateData);
