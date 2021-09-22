import jwt from "jsonwebtoken";
import { Customer } from "../entities/Customer";

const signJwt = (payload: Customer) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
};

export default signJwt;
