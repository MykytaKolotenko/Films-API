/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { URI_MONGO } = process.env;

async function connectMongo() {
  try {
    if (URI_MONGO) {
      await mongoose.connect(URI_MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log('Connected to MongoDB');
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB');
    process.exit(1);
  }
}

export default connectMongo;
