import User, { IUser } from 'db/user';

export const registerSRV = async (body: IUser) => {
  const data = await new User(body);
  data.save();

  return data;
};

export const getUserByIdSRV = async (id: string) =>
  await User.findById(id, 'id username email owner');

export const getUserByEmailSRV = async (email: string) =>
  await User.findOne({ email });

export const setTokenSRV = async (id: string, token: string | null) => {
  return await User.findByIdAndUpdate(id, { token });
};
