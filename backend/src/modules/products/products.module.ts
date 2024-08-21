import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import ProductsController from "./products.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import { DatabaseModule } from "../../db/database.module";
import ProductsRepository from "./products.repository";

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  providers: [ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(ProductsController);
  }
}
