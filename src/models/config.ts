import { MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
export const url = process.env.MONGODB_URI as string;

if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}
export const dbName = process.env.DB_NAME;

export const devMode = process.env.NODE_ENV === "development";

export const options: MongoClientOptions = {};

export const ErrorLogger = console.error;
//export const ErrorLogger = () => {};
