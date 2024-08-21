import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import ProductsRepository from "./products.repository";

@Controller()
class ProductsController {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Get()
  async getProducts(@Res() res: Response) {
    const products = await this.productsRepository.getAll();

    res.status(HttpStatus.OK).send({ products });
  }
}

export default ProductsController;
