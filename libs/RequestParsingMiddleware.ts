import { Logger, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { Config } from "src/Config";

import { EntityId } from "libs/EntityId";

export function RequestParsingMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  Object.assign(request, { requestId: new EntityId().toString() });
  const authHeader = request.header("Authorization");
  if (!authHeader) return next();

  const [type, accessToken] = authHeader.split(" ");
  if (type !== "Bearer" || !accessToken) throw new UnauthorizedException();
  try {
    Object.assign(request, {
      user: verify(accessToken, new Config().JWT_SECRET),
    });
    next();
  } catch (error) {
    new Logger(RequestParsingMiddleware.name).error(error);
    throw new UnauthorizedException();
  }
}