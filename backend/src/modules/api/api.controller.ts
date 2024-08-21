import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpStatus } from "../../constants/httpStatus";
import type { SignInRequest, SignUpRequest } from "../../types";
import AuthenticationHelper from "../../helpers/authenticationHelper";

@Controller()
export class ApiController {
  constructor(private readonly authenticationHelper: AuthenticationHelper) {}

  @Get("register")
  register(@Req() req: SignUpRequest, @Res() res: Response) {
    const { fullName, email, role, password } = req.body;

    if (!fullName || !email || !role || !password) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: "The fields fullName, email, role, password are required",
      });
      return;
    } else {
      this.authenticationHelper.signUp(req, res);
    }
  }

  @Post("login")
  login(@Req() req: SignInRequest, @Res() res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: "The fields email and password are required",
      });
    } else {
      this.authenticationHelper.signIn(req, res);
    }
  }

  @Post("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authenticationHelper.logout(req, res);
  }

  @Get("refresh-access-token")
  refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authenticationHelper.refreshAccessToken(req, res);
  }
}
