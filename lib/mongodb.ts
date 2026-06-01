import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

export type FlattenObjectIds<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends mongoose.Types.ObjectId
        ? string
        : FlattenObjectIds<T[K]>;
    }
  : T;

export type DocJSON<T> = FlattenObjectIds<T> & { _id: string; __v: number };
