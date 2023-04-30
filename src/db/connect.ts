import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorGenerator from 'helpers/errorGenerator';

dotenv.config();

const { URI_MONGO } = process.env;

async function connectMongo() {
  if (!URI_MONGO) throw errorGenerator(500, 'No environment for MongoDb');

  try {
    await mongoose.connect(URI_MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`Connected to MongoDB at ${URI_MONGO}`);
  } catch (err) {
    console.error(`Failed to connect to MongoDB at ${URI_MONGO}`, err);
    process.exit(1);
  }
}

export default connectMongo;
