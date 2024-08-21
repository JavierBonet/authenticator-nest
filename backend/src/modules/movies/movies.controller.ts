import { Response } from "express";
import { HttpStatus } from "../../constants/httpStatus";
import { Controller, Get, Res } from "@nestjs/common";
import MoviesRepository from "./movies.repository";

@Controller()
class MoviesController {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  @Get()
  async getMovies(@Res() res: Response) {
    const movies = await this.moviesRepository.getAll();

    res.status(HttpStatus.OK).send({ movies });
  }
}

export default MoviesController;
