import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import DatabaseService from "../../db/database.service";
import { Response } from "express";

@Controller()
class ProductsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getProducts(@Res() res: Response) {
    const products = await this.db.getProducts();

    res.status(HttpStatus.OK).send({ products });
  }
}

export default ProductsController;
