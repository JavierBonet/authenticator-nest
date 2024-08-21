import { Injectable } from "@nestjs/common";
import DatabaseService from "../../db/database.service";
import { config } from "../../config";
import { Collection } from "../../constants/database";
import { Movie } from "../../../../common/types";
const { mongoDbName } = config;

@Injectable()
class MoviesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Movie[]> {
    return this.databaseService
      .getClient()
      .db(mongoDbName)
      .collection(Collection.Movie)
      .find<Movie>({})
      .toArray();
  }
}

export default MoviesRepository;
