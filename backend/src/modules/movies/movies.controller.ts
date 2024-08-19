import { Response } from "express";
import { HttpStatus } from "../../constants/httpStatus";
import { Controller, Get, Res } from "@nestjs/common";
import DatabaseService from "../../db/database.service";

@Controller()
class MoviesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getMovies(@Res() res: Response) {
    const movies = await this.db.getMovies();

    res.status(HttpStatus.OK).send({ movies });
  }
}

export default MoviesController;
