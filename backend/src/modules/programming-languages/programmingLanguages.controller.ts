import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import DatabaseService from "../../db/database.service";
import { Response } from "express";

@Controller()
class ProgrammingLanguagesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getProgrammingLanguages(@Res() res: Response) {
    const programmingLanguages = await this.db.getProgrammingLanguages();

    res.status(HttpStatus.OK).send({ programmingLanguages });
  }
}

export default ProgrammingLanguagesController;
