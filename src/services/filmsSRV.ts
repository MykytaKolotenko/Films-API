import Film, { IFilm } from 'db/films';

const displayFields = 'title id director date';

export const getAllFilmsSRV = async (): Promise<Array<IFilm>> =>
  await Film.find();

export const getFilmByIdSRV = async (id: string): Promise<IFilm> =>
  await Film.findById(id, displayFields);

export const createFilmSRV = async (body: IFilm): Promise<IFilm> =>
  await new Film(body).save();

export const deleteFilmSRV = async (id: string): Promise<IFilm> =>
  await Film.findByIdAndRemove(id);

export const updateFilmSRV = async (
  id: string,
  body: Partial<IFilm>
): Promise<IFilm> => Film.findByIdAndUpdate(id, body, { new: true });
