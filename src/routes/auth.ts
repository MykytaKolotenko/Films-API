import {
  loginCTRL,
  currentCTRL,
  logoutCTRL,
  registerCTRL
} from 'controllers/authCTRL';
import express from 'express';
import assyncWrapper from 'helpers/errorWrapper';
import createUserVAL from 'middleware/validation/createUserVAL';

const authRouter = express.Router();

authRouter.post('/register', createUserVAL, assyncWrapper(registerCTRL));
authRouter.post('/login', assyncWrapper(loginCTRL));
authRouter.get('/current', assyncWrapper(currentCTRL));
authRouter.get('/logout', assyncWrapper(logoutCTRL));

export default authRouter;
