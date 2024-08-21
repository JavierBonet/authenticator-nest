import { config } from "../config";

export enum Collection {
  User = "users",
  Movie = "movies",
  Product = "products",
  ProgrammingLanguage = "programming-languages",
}

const { mongoUsername, mongoPassword } = config;

export const mongoUri = `mongodb+srv://${mongoUsername}:${mongoPassword}@appcluster.cyc4aqt.mongodb.net/?retryWrites=true&w=majority&appName=AppCluster`;
