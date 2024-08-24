import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpStatus } from "../../constants/httpStatus";
import type { SignInRequest, SignUpRequest } from "../../types";
import AuthenticationService from "../../helpers/authentication.service";

@Controller()
export class ApiController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get("register")
  register(@Req() req: SignUpRequest, @Res() res: Response) {
    const { fullName, email, role, password } = req.body;

    if (!fullName || !email || !role || !password) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: "The fields fullName, email, role, password are required",
      });
      return;
    } else {
      this.authenticationService.signUp(req, res);
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
      this.authenticationService.signIn(req, res);
    }
  }

  @Post("logout")
  logout(@Res() res: Response) {
    return this.authenticationService.logout(res);
  }

  @Get("refresh-access-token")
  refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return this.authenticationService.refreshAccessToken(req, res);
  }
}
