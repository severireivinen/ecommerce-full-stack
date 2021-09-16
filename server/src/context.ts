import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

//const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  payload?: { customerId: number };
}

/*export const context = {
  prisma: prisma,
};*/
