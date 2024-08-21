import { Injectable } from "@nestjs/common";
import DatabaseService from "../../db/database.service";
import { config } from "../../config";
import { Collection } from "../../constants/database";
import { ProgrammingLanguage } from "../../../types";
const { mongoDbName } = config;

@Injectable()
class ProgrammingLanguagesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<ProgrammingLanguage[]> {
    return this.databaseService
      .getClient()
      .db(mongoDbName)
      .collection(Collection.ProgrammingLanguage)
      .find<ProgrammingLanguage>({})
      .toArray();
  }
}

export default ProgrammingLanguagesRepository;
