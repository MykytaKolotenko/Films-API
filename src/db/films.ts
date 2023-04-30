import { Schema, model } from 'mongoose';

export interface IFilm {
  title: string;
  director: string;
  date: string;
  owner: string;
}

interface IFilmReturnedformDb extends IFilm {
  __v: string;
  _id: string;
  id: string;
}

const filmsSchema = new Schema<IFilm>(
  {
    title: {
      type: String,
      require: true,
      unique: [true, 'You have this film']
    },
    director: { type: String, require: true },
    date: {
      type: Date,
      require: true,
      max: Date.now(),
      transform: (v: Date) => {
        const newDate = new Date(v);

        const dd = String(newDate.getDate()).padStart(2, '0');
        const mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = newDate.getFullYear();

        return dd + '-' + mm + '-' + yyyy;
      }
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    toJSON: {
      transform(
        _doc: Partial<IFilmReturnedformDb>,
        ret: Partial<IFilmReturnedformDb>
      ) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Film = model('film', filmsSchema);

export default Film;
