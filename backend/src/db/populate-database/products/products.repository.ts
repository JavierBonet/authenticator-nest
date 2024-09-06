import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../../entities/product.entity";

@Injectable()
class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  async create(product: Product): Promise<ProductDocument> {
    return this.productModel.create(product);
  }

  async getAmount(): Promise<number> {
    return this.productModel.collection.countDocuments();
  }
}

export default ProductsRepository;
