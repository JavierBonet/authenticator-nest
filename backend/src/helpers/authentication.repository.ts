import { Injectable } from "@nestjs/common";
import { User } from "../types";
import { Collection } from "../constants/database";
import { config } from "../config";
import DatabaseService from "../db/database.service";
import { OptionalId } from "mongodb";
const { mongoDbName } = config;

@Injectable()
class AuthenticationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createDocument(collectionName: string, document: OptionalId<User>) {
    const collection = this.databaseService
      .getClient()
      .db(mongoDbName)
      .collection(collectionName);

    return await collection.insertOne(document);
  }

  async getUserByEmail(email: string) {
    const collection = this.databaseService
      .getClient()
      .db(mongoDbName)
      .collection(Collection.User);

    return collection.findOne<User>({ email }).then((user) => {
      return user ? user : undefined;
    });
  }
}

export default AuthenticationRepository;
