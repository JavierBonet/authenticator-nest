import { Module } from "@nestjs/common";
import AuthenticationHelper from "./authenticationHelper";
import DatabaseService from "../db/database.service";
import { DatabaseModule } from "../db/database.module";
import AuthenticationRepository from "./authentication.repository";

@Module({
  imports: [DatabaseModule],
  providers: [AuthenticationHelper, AuthenticationRepository],
  exports: [AuthenticationHelper],
})
export class AuthenticationModule {}
