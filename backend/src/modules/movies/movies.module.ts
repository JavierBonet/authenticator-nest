import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import MoviesController from "./movies.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import { DatabaseModule } from "../../db/database.module";

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  controllers: [MoviesController],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(MoviesController);
  }
}
