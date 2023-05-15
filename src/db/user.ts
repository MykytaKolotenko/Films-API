import errorGenerator from '../helpers/errorGenerator';
import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  token?: string | null;
}

export interface IUserReturnedformDb extends IUser {
  __v: string;
  _id: string;
  id: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true]
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'this email is used']
    },
    password: { type: String, required: [true, 'password is required'] },
    token: {
      type: String,
      default: null
    }
  },
  {
    toJSON: {
      transform(
        _doc: Partial<IUserReturnedformDb>,
        ret: Partial<IUserReturnedformDb>
      ) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

userSchema.post(
  'save',
  function (
    error: Error,
    _doc: IUserReturnedformDb,
    next: (err?: Error) => void
  ) {
    if (
      error instanceof Error &&
      error.name === 'MongoError' &&
      (error as unknown as { code: number }).code === 11000
    ) {
      next(errorGenerator(404, 'This email is alredy used'));
    } else {
      next();
    }
  }
);

const User = model<IUser>('user', userSchema);

export default User;
