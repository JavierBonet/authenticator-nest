import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoUri } from "../../constants/database";
import { config } from "../../config";
import { MoviesModule } from "./movies/movies.module";
import { ProductsModule } from "./products/products.module";
import { ProgrammingLanguagesModule } from "./programmingLanguages/programmingLanguages.module";

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, { dbName: config.mongoDbName }),
    MoviesModule,
    ProductsModule,
    ProgrammingLanguagesModule,
  ],
})
export class AppModule {}
