import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from "../../db/entities/product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>
  ) {}

  async getAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }
}

export default ProductsRepository;
