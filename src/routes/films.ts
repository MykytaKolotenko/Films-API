import express from 'express';
import {
  createFilmCTRL,
  deleteFilmCTRL,
  getAllFilmsCTRL,
  getAllUsersFilmsCTRL,
  getFilmByIdCTRL,
  updateFilmCTRL
} from '../controllers/filmsCTRL';
import assyncWrapper from '../helpers/errorWrapper';
import postFilmVAL from '../middleware/validation/postFilmVAL';
import privateRoute from '../middleware/privateRoute';
import patchFilmVAL from '../middleware/validation/patchFilmVAL';

const filmsRouter = express.Router();

// Public
filmsRouter.get('/', assyncWrapper(getAllFilmsCTRL));
filmsRouter.get('/user/:userId', assyncWrapper(getAllUsersFilmsCTRL));
filmsRouter.get('/:id', assyncWrapper(getFilmByIdCTRL));

// Private
filmsRouter.use(assyncWrapper(privateRoute));
filmsRouter.post('/', postFilmVAL, assyncWrapper(createFilmCTRL));
filmsRouter.patch('/:id', patchFilmVAL, assyncWrapper(updateFilmCTRL));
filmsRouter.delete('/:id', assyncWrapper(deleteFilmCTRL));

export default filmsRouter;
