import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ApiModule } from "./api/api.module";
import { MoviesModule } from "./movies/movies.module";
import { ProductsModule } from "./products/products.module";
import { ProgrammingLanguagesModule } from "./programming-languages/programmingLanguages.module";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoUri } from "../constants/database";
import { config } from "../config";

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, { dbName: config.mongoDbName }),
    ApiModule,
    MoviesModule,
    ProductsModule,
    ProgrammingLanguagesModule,
    RouterModule.register([
      {
        path: "api/v1",
        module: ApiModule,
        children: [
          { path: "movies", module: MoviesModule },
          { path: "products", module: ProductsModule },
          { path: "programming-languages", module: ProgrammingLanguagesModule },
        ],
      },
    ]),
  ],
})
export class AppModule {}
