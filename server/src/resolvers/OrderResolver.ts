import { Order } from "../entities/Order";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  async getOrders(@Ctx() ctx: Context) {
    return ctx.prisma.order.findMany({});
  }

  @Query(() => [Order])
  async getOrdersCustomer(
    @Arg("customerId") customerId: number,
    @Ctx() ctx: Context
  ) {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error(`Could not find customer with id ${customerId}`);
    }

    const orders = await ctx.prisma.order.findMany({
      where: { customerId: customer.id },
    });

    /*const returOrderObjects = orders.map(async (o: any) => ({
      id: o.id,
      customer: await ctx.prisma.customer.findUnique({
        where: { id: o.customerId },
      }),
      orderStatusCode: await ctx.prisma.orderStatusCode.findUnique({
        where: { id: o.orderStatusCodeId },
      }),
    }));*/
    return orders;
  }

  @Mutation(() => Order)
  async createOrder(
    @Arg("customerId") customerId: number,
    @Ctx() ctx: Context
  ): Promise<Order> {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error(`Could not find customer with id ${customerId}`);
    }

    const orderStatus = await ctx.prisma.orderStatusCode.findUnique({
      where: { processed: false },
    });

    if (!orderStatus) {
      throw new Error(`Could not find statuscode`);
    }

    const newOrder = await ctx.prisma.order.create({
      data: { customerId: customer.id, orderStatusCodeId: orderStatus.id },
    });

    const returnObjet = {
      id: newOrder.id,
      customer: customer,
      orderStatusCode: orderStatus,
    };

    return returnObjet;
  }
}
