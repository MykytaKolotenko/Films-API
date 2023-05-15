import { IUserReturnedformDb } from 'db/user';
import { Request, Response, NextFunction } from 'express';
import errorGenerator from '../helpers/errorGenerator';
import { verifyToken } from '../helpers/jwt';
import { getUserByIdSRV } from '../services/authSRV';

export interface IPrivateRoute extends Request {
  user?: Partial<IUserReturnedformDb>;
}

const privateRoute = async (
  req: IPrivateRoute,
  _res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) throw errorGenerator(401, 'Not authorized');

  const { id } = verifyToken(req.headers.authorization);
  if (!id) throw errorGenerator(401, 'Invalid authorization token');

  const user = await getUserByIdSRV(id);

  if (!user) throw errorGenerator(404, 'User not found or not authorized');

  req.user = user;

  next();
};

export default privateRoute;
