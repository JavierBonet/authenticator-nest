import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ProgrammingLanguage,
  ProgrammingLanguageSchema,
} from "../../entities/programmingLanguage.entity";
import ProgrammingLanguagesRepository from "./programmingLanguages.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgrammingLanguage.name, schema: ProgrammingLanguageSchema },
    ]),
  ],
  providers: [ProgrammingLanguagesRepository],
  exports: [ProgrammingLanguagesRepository],
})
export class ProgrammingLanguagesModule {}
