import express from "express";
import { config } from "./config";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./modules/app.module";

const { serverPort, frontendHost } = config;

async function startServer() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  const corsOptions: CorsOptions = {
    origin: frontendHost,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  };

  app.use(cors(corsOptions));

  await app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
  });
}

export { startServer };
