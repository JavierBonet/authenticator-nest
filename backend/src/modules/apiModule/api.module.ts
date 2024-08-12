import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ApiController } from "./api.controller";

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [
    /*ApiService, AuthenticationController*/
  ],
})
export class ApiModule {}
