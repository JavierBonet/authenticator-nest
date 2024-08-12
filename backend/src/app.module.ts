import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ApiModule } from "./modules/apiModule/api.module";

@Module({
  imports: [ApiModule],
  controllers: [
    /** COMPLETE */
  ],
  providers: [
    /** COMPLETE */
  ],
})
export class AppModule {}
