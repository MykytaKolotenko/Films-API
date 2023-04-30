import Film, { IFilm } from 'db/films';

const displayFields = 'title id director date';

// ==============================================================

export const getAllFilmsSRV = async (): Promise<Array<IFilm>> =>
  await Film.find();

// ==============================================================
export const getUserFilmsSRV = async (userId: string): Promise<Array<IFilm>> =>
  await Film.find({ owner: userId });
// ==============================================================

export const getFilmByIdSRV = async (id: string): Promise<IFilm> =>
  await Film.findById(id, displayFields);

// ==============================================================

export const createFilmSRV = async (body: IFilm): Promise<IFilm> => {
  const data = await new Film(body);
  data.save();

  return data;
};

// ==============================================================

export const deleteFilmSRV = async (id: string): Promise<IFilm> =>
  await Film.findByIdAndRemove(id);

// ==============================================================

export const updateFilmSRV = async (
  id: string,
  body: Partial<IFilm>
): Promise<IFilm> => Film.findByIdAndUpdate(id, body, { new: true });
