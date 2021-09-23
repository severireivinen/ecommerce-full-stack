import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CustomerResolver } from "./resolvers/CustomerResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { PrismaClient } from ".prisma/client";
import { ShoppingCartItemResolver } from "./resolvers/ShoppingCartItemResolver";
import { OrderResolver } from "./resolvers/OrderResolver";

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000", //http://localhost:3000 tai *
      //origin: "*", //http://localhost:3000 tai *
      credentials: true,
    })
  );

  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CustomerResolver,
        ProductResolver,
        ShoppingCartItemResolver,
        OrderResolver,
      ],
    }),
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
