import { NextFunction, RequestHandler, Response, Request } from 'express';
import errorGenerator from '../../helpers/errorGenerator';
import errorWrapper from '../../helpers/errorWrapper';
import Joi from 'joi';

interface IRequestHandler extends RequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const registerShema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validateData: IRequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = registerShema.validate(req.body);

  if (error) {
    throw errorGenerator(400, error.message);
  } else {
    next();
  }
};

export default errorWrapper(validateData);
