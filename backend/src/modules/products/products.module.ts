import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import ProductsController from "./products.controller";
import { AuthenticateMiddleware } from "../../middleware/authenticate.middleware";
import { AuthenticationModule } from "../../helpers/authentication.module";
import { DatabaseModule } from "../../db/database.module";

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  controllers: [ProductsController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(ProductsController);
  }
}
