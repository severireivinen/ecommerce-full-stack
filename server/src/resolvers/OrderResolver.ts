import { Order } from "../entities/Order";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  async getOrders(@Ctx() ctx: Context) {
    return await ctx.prisma.order.findMany({
      include: {
        customer: true,
        orderItems: { include: { product: true } },
        orderStatusCode: true,
      },
    });
  }

  @Query(() => [Order])
  async getOrdersCustomer(
    @Arg("customerId") customerId: string,
    @Ctx() ctx: Context
  ) {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error(`Could not find customer with id ${customerId}`);
    }

    return await ctx.prisma.order.findMany({
      where: { customerId: customer.id },
      include: {
        customer: true,
        orderItems: { include: { product: true } },
        orderStatusCode: true,
      },
    });
  }

  @Mutation(() => Boolean)
  async createOrder(@Ctx() ctx: Context): Promise<Boolean> {
    const token = ctx.req.headers.authorization;
    if (!token!) {
      throw new Error("Not logged in or token not found");
    }
    const customer = await ctx.prisma.customer.findUnique({
      where: { accessToken: token },
    });

    if (!customer) {
      throw new Error(`Could not find customer with token ${token}`);
    }

    const newOrder = await ctx.prisma.order.create({
      data: {
        customerId: customer.id,
        orderStatusCodeId: "cktx3smn00000h8vgpj6pfsjd",
      },
    });

    if (!newOrder) {
      throw new Error("Failed to create order");
    }

    const userCart = await ctx.prisma.shoppingCartItem.findMany({
      where: { customerId: customer.id },
    });

    const cartItemsToOrderItems = userCart.map(async (item) => {
      await ctx.prisma.orderItem.createMany({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        },
      });
    });

    if (!cartItemsToOrderItems) {
      throw new Error("Error creating order items.");
    }

    const clearCustomerCart = await ctx.prisma.shoppingCartItem.deleteMany({
      where: { customerId: customer.id },
    });

    if (!clearCustomerCart) {
      throw new Error("Error clearing customer cart");
    }
    return true;
  }
}
