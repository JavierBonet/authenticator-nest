import { MongoClient, OptionalId, ServerApiVersion } from "mongodb";
import "dotenv/config";
import { config } from "../config";
import movies from "./mocks/movies.json";
import products from "./mocks/tools.json";
import programmingLanguages from "./mocks/programmingLanguages.json";
import { Collection } from "../constants/database";
import { MovieDocument } from "./entities/movie.entity";
import { ProductDocument } from "./entities/product.entity";
import { ProgrammingLanguageDocument } from "./entities/programmingLanguage.entity";

const { mongoUsername, mongoPassword, mongoDbName } = config;

const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@appcluster.cyc4aqt.mongodb.net/?retryWrites=true&w=majority&appName=AppCluster`;

let client: MongoClient;

function getClient() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  return client;
}

async function connect() {
  await getClient().connect();
}

async function createMovie(movie: OptionalId<MovieDocument>) {
  const collection = getClient().db(mongoDbName).collection(Collection.Movie);

  return await collection.insertOne(movie);
}

async function createProduct(product: OptionalId<ProductDocument>) {
  const collection = getClient().db(mongoDbName).collection(Collection.Product);

  return await collection.insertOne(product);
}

async function createProgrammingLanguage(
  programmingLanguage: OptionalId<ProgrammingLanguageDocument>
) {
  const collection = getClient()
    .db(mongoDbName)
    .collection(Collection.ProgrammingLanguage);

  return await collection.insertOne(programmingLanguage);
}

async function close() {
  await getClient().close();
}

async function createMovies() {
  for (const movie of movies) {
    await createMovie(movie as MovieDocument);
  }
}

async function createProducts() {
  for (const product of products) {
    await createProduct(product as unknown as ProductDocument);
  }
}

async function createProgrammingLanguages() {
  for (const programmingLanguage of programmingLanguages) {
    await createProgrammingLanguage(
      programmingLanguage as ProgrammingLanguageDocument
    );
  }
}

(async () => {
  await connect();

  const collections = await getClient()
    .db(mongoDbName)
    .listCollections()
    .toArray();

  // Movies
  if (!collections.some((c) => c.name === Collection.Movie)) {
    console.log("Creating movies...");
    await createMovies();
  }

  // Products
  if (!collections.some((c) => c.name === Collection.Product)) {
    console.log("Creating products...");
    await createProducts();
  }

  // Programming languages
  if (!collections.some((c) => c.name === Collection.ProgrammingLanguage)) {
    console.log("Creating programming languages...");
    await createProgrammingLanguages();
  }

  await close();
})();
