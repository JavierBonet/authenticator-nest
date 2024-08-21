import { Injectable } from "@nestjs/common";
import { MongoClient, ServerApiVersion } from "mongodb";
import { mongoUri } from "../constants/database";

let client: MongoClient;

@Injectable()
class DatabaseService {
  getClient() {
    if (!client) {
      client = new MongoClient(mongoUri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    return client;
  }

  async close() {
    await this.getClient().close();
  }
}

export default DatabaseService;
