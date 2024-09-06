import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ProgrammingLanguage,
  ProgrammingLanguageDocument,
} from "../../entities/programmingLanguage.entity";

@Injectable()
class ProgrammingLanguagesRepository {
  constructor(
    @InjectModel(ProgrammingLanguage.name)
    private readonly programmingLanguageModel: Model<ProgrammingLanguage>
  ) {}

  async create(
    programmingLanguage: ProgrammingLanguage
  ): Promise<ProgrammingLanguageDocument> {
    return this.programmingLanguageModel.create(programmingLanguage);
  }

  async getAmount(): Promise<number> {
    return this.programmingLanguageModel.collection.countDocuments();
  }
}

export default ProgrammingLanguagesRepository;
