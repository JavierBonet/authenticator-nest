import { Module } from "@nestjs/common";
import AuthenticationService from "./authentication.service";
import { DatabaseModule } from "../db/database.module";
import AuthenticationRepository from "./authentication.repository";

@Module({
  imports: [DatabaseModule],
  providers: [AuthenticationService, AuthenticationRepository],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
