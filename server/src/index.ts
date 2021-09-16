import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "./resolvers/CustomerResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { PrismaClient } from ".prisma/client";
import cors from "cors";

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "*", //http://localhost:3000
      credentials: true,
    })
  );

  app.post("/refresh_token", async (req, _res) => {
    const token = req.cookies.jid;
    console.log(token);
  });

  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CustomerResolver, ProductResolver],
    }),
    //context: context,
    context: ({ req, res }) => ({ prisma: prisma, req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
  });
};

main().catch((err) => {
  console.log(err);
});
