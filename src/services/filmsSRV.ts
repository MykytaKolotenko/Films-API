import Film, { IFilm } from '../db/films';

const displayFields = 'title id director date';

// ==============================================================

export const getAllFilmsSRV = async (
  page: number,
  per_page: number
): Promise<Array<IFilm>> =>
  await Film.find()
    .limit(per_page)
    .skip(per_page * (page - 1));

// ==============================================================

export const getUserFilmsSRV = async (
  userId: string,
  page: number,
  per_page: number
): Promise<Array<IFilm>> =>
  await Film.find({ owner: userId })
    .limit(per_page)
    .skip(per_page * (page - 1));

// ==============================================================

export const getFilmByIdSRV = async (id: string): Promise<IFilm> =>
  await Film.findById(id, displayFields);

// ==============================================================

export const createFilmSRV = async (body: IFilm): Promise<IFilm> => {
  const data = new Film(body);
  await data.save();
  return data;
};

// ==============================================================

export const deleteFilmSRV = async (id: string): Promise<IFilm> =>
  await Film.findByIdAndRemove(id);

// ==============================================================

export const updateFilmSRV = async (
  id: string,
  body: Partial<IFilm>
): Promise<IFilm> => {
  const data = await Film.findByIdAndUpdate(id, { ...body }, { new: true });

  return data;
};
