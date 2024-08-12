import express from "express";
import { config } from "./config";
import { router as apiRouter } from "./routes/apiRouter";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

const { serverPort, frontendHost } = config;

async function startServer() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // TODO:
  // ADD ABOVE THE CONFIGURATION TO REPLICATE THE SAME CONFIG OF EXPRESS BELOW

  await app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
  });
}

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions: CorsOptions = {
//   origin: frontendHost,
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Authorization"],
// };

// app.use(cors(corsOptions));

// // Define authentication routes in a separate file
// // Maybe will need to just declare the methods that handle login and signup and then use them in here
// // app.use('/login', authenticationRouter)

// // Define authorization routes in a separate file

// app.use("/api/v1", apiRouter);

// function startServer() {
//   app.listen(serverPort, () => {
//     console.log(`Server started on port ${serverPort}`);
//   });
// }

export { startServer };
