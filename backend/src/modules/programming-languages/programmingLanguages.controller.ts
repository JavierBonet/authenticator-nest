import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import ProgrammingLanguagesRepository from "./programmingLanguages.repository";

@Controller()
class ProgrammingLanguagesController {
  constructor(
    private readonly programmingLanguagesRepository: ProgrammingLanguagesRepository
  ) {}

  @Get()
  async getProgrammingLanguages(@Res() res: Response) {
    const programmingLanguages =
      await this.programmingLanguagesRepository.getAll();

    res.status(HttpStatus.OK).send({ programmingLanguages });
  }
}

export default ProgrammingLanguagesController;
