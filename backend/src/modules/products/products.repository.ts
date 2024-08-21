import { Injectable } from "@nestjs/common";
import DatabaseService from "../../db/database.service";
import { config } from "../../config";
import { Collection } from "../../constants/database";
import { Product } from "../../../types";
const { mongoDbName } = config;

@Injectable()
class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Product[]> {
    return this.databaseService
      .getClient()
      .db(mongoDbName)
      .collection(Collection.Product)
      .find<Product>({})
      .toArray();
  }
}

export default ProductsRepository;
