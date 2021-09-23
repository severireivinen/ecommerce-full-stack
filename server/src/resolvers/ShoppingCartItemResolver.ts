import { ShoppingCartItem } from "../entities/ShoppingCartItem";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class ShoppingCartItemResolver {
  @Mutation(() => ShoppingCartItem)
  async addToCart(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<ShoppingCartItem> {
    const token = ctx.req.headers.authorization;
    const product = await ctx.prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new Error("Product not found!");
    }

    const customer = await ctx.prisma.customer.findUnique({
      where: { accessToken: token },
    });

    if (!customer) {
      throw new Error("Customer not found!");
    }

    const cartProduct = await ctx.prisma.shoppingCartItem.upsert({
      where: {
        productId_customerId: {
          customerId: customer.id,
          productId: product.id,
        },
      },
      update: {
        quantity: { increment: 1 },
        price: { increment: product.price },
      },
      create: {
        quantity: 1,
        price: product.price,
        productId: product.id,
        customerId: customer.id,
      },
    });
    const toReturn = {
      ...cartProduct,
      id: cartProduct.id.toString(),
      customer: customer,
      product: product,
    };
    return toReturn;
  }
  @Mutation(() => ShoppingCartItem)
  async removeFromCart(
    @Arg("customerId") customerId: string,
    @Arg("productId") productId: string,
    @Ctx() ctx: Context
  ): Promise<ShoppingCartItem | null> {
    const product = await ctx.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found!");
    }

    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error("Customer not found!");
    }

    const customerCart = await ctx.prisma.shoppingCartItem.findUnique({
      where: {
        productId_customerId: {
          customerId: customer.id,
          productId: product.id,
        },
      },
    });

    if (!customerCart) {
      throw new Error("Could not find entry");
    }

    if (customerCart.quantity === 1) {
      const removedEntry = await ctx.prisma.shoppingCartItem.delete({
        where: {
          productId_customerId: {
            customerId: customer.id,
            productId: product.id,
          },
        },
      });
      const toReturn = {
        ...removedEntry,
        id: removedEntry.id.toString(),
        customer: customer,
        product: product,
      };
      return toReturn;
    } else {
      const newCartProduct = await ctx.prisma.shoppingCartItem.update({
        where: {
          productId_customerId: {
            customerId: customer.id,
            productId: product.id,
          },
        },
        data: {
          quantity: { decrement: 1 },
          price: { decrement: product.price },
        },
      });
      const toReturn = {
        ...newCartProduct,
        id: newCartProduct.id.toString(),
        customer: customer,
        product: product,
      };
      return toReturn;
    }
  }
}
