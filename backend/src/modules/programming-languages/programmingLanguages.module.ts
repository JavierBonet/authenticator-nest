import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import ProgrammingLanguagesController from "./programmingLanguages.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import ProgrammingLanguagesRepository from "./programmingLanguages.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ProgrammingLanguage,
  ProgrammingLanguageSchema,
} from "../../db/entities/programmingLanguage.entity";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: ProgrammingLanguage.name, schema: ProgrammingLanguageSchema },
    ]),
  ],
  providers: [ProgrammingLanguagesRepository],
  controllers: [ProgrammingLanguagesController],
})
export class ProgrammingLanguagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes(ProgrammingLanguagesController);
  }
}
