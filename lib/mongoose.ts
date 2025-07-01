import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI as string;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var Mongoose: MongooseConnection;
}

let cached = global.Mongoose;

if (!cached) {
  cached = global.Mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "devflow",
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
