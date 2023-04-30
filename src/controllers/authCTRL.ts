import { Request, Response } from 'express';
import errorGenerator from 'helpers/errorGenerator';
import { comparePassword, hashPassword } from 'helpers/hash';
import { createToken, verifyToken } from 'helpers/jwt';
import {
  getUserByEmailSRV,
  getUserByIdSRV,
  registerSRV,
  setTokenSRV
} from 'services/authSRV';

// ====================================================================

export const registerCTRL = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const hashedPassword = await hashPassword(password);
  await registerSRV({ username, email, password: hashedPassword });

  res.status(201).json({ message: 'Registration successful' });
};

// ====================================================================

export const loginCTRL = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) throw errorGenerator(401, 'No email!');
  if (!password) throw errorGenerator(401, 'No Password!');

  const user = await getUserByEmailSRV(email);

  if (!user) throw errorGenerator(404, 'User not found!');

  const correctPassword = await comparePassword(password, user.password);
  if (!correctPassword) throw errorGenerator(401, 'Password is wrong');

  const tokenPayload = { id: user.id, email: user.email };
  const token = createToken(tokenPayload);
  const data = await setTokenSRV(user.id, token);

  if (!data) throw errorGenerator(401, 'Something went wrong');

  res.status(200).json({ ...tokenPayload, token });
};

// ====================================================================

export const currentCTRL = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    throw errorGenerator(401, 'Not authorized');
  }

  const { id } = verifyToken(req.headers.authorization);
  if (!id) throw errorGenerator(404, 'Something went wrong with id ');

  const user = await getUserByIdSRV(id);

  if (!user) throw errorGenerator(404, 'User not found ');

  res.status(200).json(user);
};

// ====================================================================

export const logoutCTRL = async (req: Request, res: Response) => {
  if (!req.headers?.authorization) {
    throw errorGenerator(401, 'Not authorized');
  }

  const { id } = verifyToken(req.headers.authorization);
  if (!id) throw errorGenerator(404, 'Something went wrong with id ');

  const data = await setTokenSRV(id, null);

  if (!data) throw errorGenerator(404, 'Not found');

  res.status(204).send();
};
