export class CustomError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const errorGenerator = (status: number, message?: string) => {
  switch (status) {
    case 11000:
      return new CustomError(409, 'This email is already registered');

    default:
      return new CustomError(status, message || 'Something went wrong');
  }
};

export default errorGenerator;
