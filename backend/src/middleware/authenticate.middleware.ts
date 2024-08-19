import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import AuthenticationHelper from "../helpers/authenticationHelper";

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private readonly authenticationHelper: AuthenticationHelper) {}

  use(req: Request, res: Response, next: NextFunction) {
    // this.authenticationHelper.authenticate(req, res, next);
    next();
  }
}
