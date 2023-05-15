import User, { IUser } from '../db/user';

export const registerSRV = async (body: IUser) => {
  const data = new User(body);
  await data.save();

  return data;
};

export const getUserByIdSRV = async (id: string) =>
  await User.findById(id, 'id username email owner');

export const getUserByEmailSRV = async (email: string) =>
  await User.findOne({ email });

export const setTokenSRV = async (id: string, token: string | null) =>
  await User.findByIdAndUpdate(id, { token });
