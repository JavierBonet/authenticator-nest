import { Module } from "@nestjs/common";
import AuthenticationHelper from "./authenticationHelper";
import DatabaseService from "../db/database.service";

@Module({
  providers: [AuthenticationHelper, DatabaseService],
  exports: [AuthenticationHelper],
})
export class AuthenticationModule {}
