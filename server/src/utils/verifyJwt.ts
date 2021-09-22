import jwt from "jsonwebtoken";

const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

export default verifyJwt;
