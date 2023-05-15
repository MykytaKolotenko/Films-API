/* eslint-disable no-console */
import connectMongo from './db/connect';
import app from './app';

const PORT: number = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await connectMongo();

    const server = app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    server.on('error', (err) => {
      console.error('Error at server launch', err);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();
