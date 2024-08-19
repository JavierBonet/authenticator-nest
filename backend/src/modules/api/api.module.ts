import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { DatabaseModule } from "../../db/database.module";
import { AuthenticationModule } from "../../helpers/authentication.module";

@Module({
  imports: [AuthenticationModule, DatabaseModule],
  controllers: [ApiController],
})
export class ApiModule {}
