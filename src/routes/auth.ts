import {
  loginCTRL,
  currentCTRL,
  logoutCTRL,
  registerCTRL
} from '../controllers/authCTRL';
import express from 'express';
import assyncWrapper from '../helpers/errorWrapper';
import createUserCreateVAL from '../middleware/validation/createUserCreateVAL';
import loginUserVAL from '../middleware/validation/loginUserVAL';

const authRouter = express.Router();

authRouter.post('/register', createUserCreateVAL, assyncWrapper(registerCTRL));
authRouter.post('/login', loginUserVAL, assyncWrapper(loginCTRL));
authRouter.get('/current', assyncWrapper(currentCTRL));
authRouter.get('/logout', assyncWrapper(logoutCTRL));

export default authRouter;
