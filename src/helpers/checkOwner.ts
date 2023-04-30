import errorGenerator from './errorGenerator';
import { verifyToken } from './jwt';

const checkOwner = (token: string, ownerId: string) => {
  const { id } = verifyToken(token);

  if (!(String(ownerId) === id))
    throw errorGenerator(401, 'Its not your film. GET OUT!!');

  return;
};

export default checkOwner;
