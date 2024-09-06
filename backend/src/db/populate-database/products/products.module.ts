import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../entities/product.entity";
import ProductsRepository from "./products.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
