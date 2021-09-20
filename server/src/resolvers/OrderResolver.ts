import { Order } from "../entities/Order";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  async getOrders(@Ctx() ctx: Context) {
    return ctx.prisma.order.findMany({});
  }
}
