import { sign } from "jsonwebtoken";
import { Customer } from "../entities/Customer";

export const createAccessToken = (customer: Customer) => {
  return sign({ customerId: customer.id }, process.env.ACCESS_TOKEN_SECRET!);
};
