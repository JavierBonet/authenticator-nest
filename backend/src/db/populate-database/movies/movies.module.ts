import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "../../entities/movie.entity";
import MoviesRepository from "./movies.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MoviesRepository],
  exports: [MoviesRepository],
})
export class MoviesModule {}
