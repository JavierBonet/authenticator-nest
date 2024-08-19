import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import ProgrammingLanguagesController from "./programmingLanguages.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { DatabaseModule } from "../../db/database.module";
import { AuthenticationModule } from "../../helpers/authentication.module";

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  controllers: [ProgrammingLanguagesController],
})
export class ProgrammingLanguagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes(ProgrammingLanguagesController);
  }
}
