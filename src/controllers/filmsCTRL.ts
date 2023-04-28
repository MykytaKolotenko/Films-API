import { IFilm } from 'db/films';
import { Request, Response } from 'express';
import errorGenerator from 'helpers/errorGenerator';
import {
  createFilmSRV,
  deleteFilmSRV,
  getAllFilmsSRV,
  getFilmByIdSRV,
  updateFilmSRV
} from 'services/filmsSRV';

export const getAllFilmsCTRL = async (_req: Request, res: Response) => {
  const data = await getAllFilmsSRV();

  if (!data) {
    throw errorGenerator(404, 'Something get wrong with MongoDB');
  }

  res.status(200).json(data);
  return;
};

export const getAllUsersFilmsCTRL = async (_req: Request, res: Response) => {
  res.status(200).json({ mes: 'users Films' });
  return;
};

export const getFilmByIdCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getFilmByIdSRV(id);

  if (!data) {
    throw errorGenerator(404, 'Something wrong with id. Not found');
  }

  res.status(200).json(data);
  return;
};

export const createFilmCTRL = async (req: Request, res: Response) => {
  const { director, title, date }: IFilm = req.body;
  const data = await createFilmSRV({ director, title, date });

  res.status(200).json(data);
  return;
};

export const updateFilmCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: IFilm = req.body;

  const updatedData = await updateFilmSRV(id, data);

  if (!data) {
    throw errorGenerator(404, 'Something wrong with id. Not found');
  }

  res.status(200).json(updatedData);
  return;
};

export const deleteFilmCTRL = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await deleteFilmSRV(id);

  if (!data) {
    throw errorGenerator(404, 'Something wrong with id. Not found');
  }

  res.status(200).json(data);
  return;
};
