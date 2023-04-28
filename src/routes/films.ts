import express from 'express';
import {
  createFilmCTRL,
  deleteFilmCTRL,
  getAllFilmsCTRL,
  getAllUsersFilmsCTRL,
  getFilmByIdCTRL,
  updateFilmCTRL
} from '../controllers/filmsCTRL';
import assyncWrapper from 'helpers/errorWrapper';

const filmsRouter = express.Router();

// Public
filmsRouter.get('/', assyncWrapper(getAllFilmsCTRL));
filmsRouter.get('/user/:id', assyncWrapper(getAllUsersFilmsCTRL));
filmsRouter.get('/:id', assyncWrapper(getFilmByIdCTRL));

// Private
filmsRouter.post('/', assyncWrapper(createFilmCTRL));
filmsRouter.patch('/:id', assyncWrapper(updateFilmCTRL));
filmsRouter.delete('/:id', assyncWrapper(deleteFilmCTRL));

export default filmsRouter;
