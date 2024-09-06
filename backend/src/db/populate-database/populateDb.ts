import "dotenv/config";
import movies from "../mocks/movies.json";
import products from "../mocks/tools.json";
import programmingLanguages from "../mocks/programmingLanguages.json";
import { MovieDocument } from "../entities/movie.entity";
import { ProductDocument } from "../entities/product.entity";
import { ProgrammingLanguageDocument } from "../entities/programmingLanguage.entity";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import MoviesRepository from "./movies/movies.repository";
import ProductsRepository from "./products/products.repository";
import ProgrammingLanguagesRepository from "./programmingLanguages/programmingLanguages.repository";

let createdDocumentCount = 0;

async function start() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const moviesRepository = app.get(MoviesRepository);
  const productsRepository = app.get(ProductsRepository);
  const programmingLanguagesRepository = app.get(
    ProgrammingLanguagesRepository
  );

  await createMovies(moviesRepository);
  await createProducts(productsRepository);
  await createProgrammingLanguages(programmingLanguagesRepository);

  if (createdDocumentCount !== 0) {
    console.log(
      `Successfully created ${createdDocumentCount} documents in the database`
    );
  } else {
    console.log("Database already populated. No documents were created.");
  }

  await app.close();
}

async function createMovies(repository: MoviesRepository) {
  const count = await repository.getAmount();
  if (count === 0) {
    console.log("Creating movies...");
    for (const movie of movies) {
      await repository.create(movie as MovieDocument);
      createdDocumentCount++;
    }
  }
}

async function createProducts(repository: ProductsRepository) {
  const count = await repository.getAmount();
  if (count === 0) {
    console.log("Creating products...");
    for (const product of products) {
      await repository.create(product as unknown as ProductDocument);
      createdDocumentCount++;
    }
  }
}

async function createProgrammingLanguages(
  repository: ProgrammingLanguagesRepository
) {
  const count = await repository.getAmount();
  if (count === 0) {
    console.log("Creating programming languages...");
    for (const programmingLanguage of programmingLanguages) {
      await repository.create(
        programmingLanguage as ProgrammingLanguageDocument
      );
      createdDocumentCount++;
    }
  }
}

start();
