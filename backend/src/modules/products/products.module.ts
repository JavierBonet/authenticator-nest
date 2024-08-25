import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import ProductsController from "./products.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import ProductsRepository from "./products.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../db/entities/product.entity";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(ProductsController);
  }
}
