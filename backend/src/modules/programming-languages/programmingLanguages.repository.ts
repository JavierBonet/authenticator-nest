import { Injectable } from "@nestjs/common";
import {
  ProgrammingLanguage,
  ProgrammingLanguageDocument,
} from "../../db/entities/programmingLanguage.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
class ProgrammingLanguagesRepository {
  constructor(
    @InjectModel(ProgrammingLanguage.name)
    private readonly programmingLanguageModel: Model<ProgrammingLanguage>
  ) {}

  async getAll(): Promise<ProgrammingLanguageDocument[]> {
    return this.programmingLanguageModel.find().exec();
  }
}

export default ProgrammingLanguagesRepository;
