import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import AuthenticationService from "../helpers/authentication.service";

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // this.authenticationService.authenticate(req, res, next);
    next();
  }
}
