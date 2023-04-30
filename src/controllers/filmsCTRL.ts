import { IFilm } from 'db/films';
import { Request, Response } from 'express';
import errorGenerator from 'helpers/errorGenerator';
import { IPrivateRoute } from 'middleware/privateRoute';

import {
  createFilmSRV,
  deleteFilmSRV,
  getAllFilmsSRV,
  getFilmByIdSRV,
  getUserFilmsSRV,
  updateFilmSRV
} from 'services/filmsSRV';

// ==============================================================

export const getAllFilmsCTRL = async (_req: Request, res: Response) => {
  const data = await getAllFilmsSRV();

  if (!data) throw errorGenerator(404, 'Something get wrong with MongoDB');

  res.status(200).json(data);
};

// ==============================================================

export const getAllUsersFilmsCTRL = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await getUserFilmsSRV(userId);

  res.status(200).json(data);
};

// ==============================================================

export const getFilmByIdCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getFilmByIdSRV(id);

  if (!data) throw errorGenerator(404, 'Something wrong with id. Not found');

  res.status(200).json(data);
};

// ==============================================================

export const createFilmCTRL = async (req: IPrivateRoute, res: Response) => {
  const userData = req.user;

  const { director, title, date }: IFilm = req.body;

  if (!userData?.id)
    throw errorGenerator(404, 'Something wrong with id. Not found');

  const data = await createFilmSRV({
    director,
    title,
    date,
    owner: userData.id
  });

  res.status(200).json(data);
};

// ==============================================================

export const updateFilmCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: IFilm = req.body;

  const updatedData = await updateFilmSRV(id, data);

  if (!data) {
    throw errorGenerator(404, 'Something wrong with id. Not found');
  }

  res.status(200).json(updatedData);
};

// ==============================================================

export const deleteFilmCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await deleteFilmSRV(id);

  if (!data) {
    throw errorGenerator(404, 'Something wrong with id. Not found');
  }

  res.status(200).json(data);
};
