import { OrderItem } from "../entities/OrderItem";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class OrderItemResolver {
  @Mutation(() => OrderItem)
  async createOrderItem(
    @Arg("orderId") orderId: number,
    @Arg("productId") productId: number,
    @Arg("quantity") quantity: number,
    @Ctx() ctx: Context
  ): Promise<OrderItem | null> {
    const order = await ctx.prisma.order.findUnique({ where: { id: orderId } });
    const product = await ctx.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!order || !product) {
      throw new Error(`Order: ${orderId} or product: ${productId} not found`);
    }

    const orderItem = await ctx.prisma.orderItem.create({
      data: {
        quantity: quantity,
        //@ts-ignore
        price: 4 * product.price,
        orderId: order.id,
        productId: product.id,
      },
    });
    return {
      id: orderItem.id,
      quantity: quantity,
      price: orderItem.price,
      orderId: orderId,
      product: product,
    };
  }
}
