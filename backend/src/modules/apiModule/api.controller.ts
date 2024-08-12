import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpStatus } from "../../constants/httpStatus";
import type {
  SignInRequest,
  SignUpRequest,
} from "../../controllers/interfaces";

@Controller("api/v1")
export class ApiController {
  constructor /*private readonly authenticationController: AuthenticationController*/() {}

  @Post("register")
  register(@Req() req: SignUpRequest, @Res() res: Response) {
    const { fullName, email, role, password } = req.body;

    if (!fullName || !email || !role || !password) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: "The fields fullName, email, role, password are required",
      });
      return;
    } else {
      // this.authenticationController.signUp(req, res);
      res.status(HttpStatus.OK).send({
        body: {
          message: "The fields fullName, email, role, password are required",
          element: 32455,
        },
      });
      return;
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
      // authenticationController.signIn(req, res);
    }
  }

  @Post("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    // authenticationController.logout(req, res);
  }

  @Get("refresh-access-token")
  refreshAccessToken() {
    // authenticationController.refreshAccessTokena
  }
}
