import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import MoviesController from "./movies.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import MoviesRepository from "./movies.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "../../db/entities/movie.entity";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MoviesRepository],
  controllers: [MoviesController],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(MoviesController);
  }
}
