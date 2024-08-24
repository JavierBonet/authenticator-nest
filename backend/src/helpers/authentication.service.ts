import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { HttpStatus } from "../constants/httpStatus";
import {
  accessTokenNotExpired,
  accessTokenValid,
  refreshUsingRefreshToken,
  getAccessToken,
  getRefreshToken,
} from "./tokenHelper";
import { SignInRequest, SignUpRequest } from "../types";
import { Injectable } from "@nestjs/common";
import { Collection } from "../constants/database";
import AuthenticationRepository from "./authentication.repository";

const SALT_ROUNDS = 10;

@Injectable()
class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository
  ) {}

  async signUp(req: SignUpRequest, res: Response) {
    const { fullName, email, role, password } = req.body;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    return this.authenticationRepository
      .getUserByEmail(email)
      .then((dbUser) => {
        if (dbUser) {
          const message = "User already exists";
          res.status(HttpStatus.BAD_REQUEST).send({ message });
          return;
        }

        const user = {
          fullName,
          email,
          role,
          password: bcrypt.hashSync(password, salt),
        };

        return this.authenticationRepository
          .createDocument(Collection.User, user)
          .then(() => {
            const successMessage = "Registration successfully";
            res.status(HttpStatus.OK).send({ message: successMessage });
          })
          .catch((error) => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ message: error });
          });
      });
  }

  async signIn(req: SignInRequest, res: Response) {
    const { email, password } = req.body;

    this.authenticationRepository
      .getUserByEmail(email)
      .then((user) => {
        let message;

        if (!user) {
          message = "User not found";
          res.status(HttpStatus.NOT_FOUND).send({ message });
        } else {
          if (!bcrypt.compareSync(password, user.password)) {
            message = "Wrong password";
            res.status(HttpStatus.UNAUTHORIZED).send({ message });
            return;
          }

          message = "Login successfully";
          const { email, role } = user;
          const payload = { email, role };

          const accessToken = getAccessToken(payload);
          const refreshToken = getRefreshToken(payload);

          res
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              sameSite: "strict",
            })
            .header("Authorization", accessToken)
            .status(HttpStatus.OK)
            .send({ user: payload, message });
        }
      })
      .catch((error) =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
      );
  }

  logout(res: Response) {
    res.clearCookie("refreshToken");
    res.status(HttpStatus.OK).send({ message: "Logged out successfully" });
  }

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const refreshToken = req.cookies["refreshToken"];
    if (!bearerToken && !refreshToken) {
      res.status(HttpStatus.UNAUTHORIZED).send({ message: "Invalid tokens" });
      return;
    }

    if (!bearerToken) {
      refreshUsingRefreshToken(res, refreshToken, next);
      return;
    }

    const accessToken = bearerToken!.split(" ")[1];
    if (accessTokenValid(accessToken)) {
      if (accessTokenNotExpired(accessToken)) {
        next();
      } else {
        refreshUsingRefreshToken(res, refreshToken, next);
      }
    } else {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: "Invalid access token" });
      return;
    }
  };

  refreshAccessToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies["refreshToken"];

    refreshUsingRefreshToken(res, refreshToken);
  };
}

export default AuthenticationService;
