import bcrypt from 'bcrypt';
import errorGenerator from './errorGenerator';
import dotenv from 'dotenv';
dotenv.config();

const salt_pas = Number(process.env.SALT_PAS);

if (isNaN(salt_pas)) {
  throw errorGenerator(500, 'Server salt problem');
}

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, salt_pas);

export const comparePassword = (
  hash: string,
  password: string
): Promise<boolean> => bcrypt.compare(hash, password);
