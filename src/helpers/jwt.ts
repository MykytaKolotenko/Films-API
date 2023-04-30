import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import errorGenerator from './errorGenerator';
import { IUserReturnedformDb } from 'db/user';

dotenv.config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw errorGenerator(500, 'Server JWT fail');
}

export const createToken = (data: Partial<IUserReturnedformDb>): string =>
  jwt.sign(data, JWT_SECRET);

export const verifyToken = (authInfo: string): Partial<IUserReturnedformDb> => {
  const { token } = { token: authInfo.split(' ')[1] };
  return jwt.verify(token, JWT_SECRET) as Partial<IUserReturnedformDb>;
};
