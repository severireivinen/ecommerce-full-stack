import { Context } from "../context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) {
    throw new AuthenticationError("Not logged in");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new AuthenticationError("Not logged in");
  }

  return next();
};