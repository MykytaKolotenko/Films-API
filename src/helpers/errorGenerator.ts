export interface IError extends Error {
  status?: number;
}

const errorGenerator = (status: number, message: string) => {
  const error: IError = new Error(message);
  error.status = status;

  return error;
};

export default errorGenerator;
