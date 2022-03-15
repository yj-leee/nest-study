import { Request as ExpressRequest } from "express";

import { User } from "libs/UserInfo";

export type Request = ExpressRequest & {
  readonly requestId: string | undefined;
  readonly user: User | undefined;
};
