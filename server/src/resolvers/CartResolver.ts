import { Context } from "../context";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";

@Resolver(() => Cart)
export class CartResolver {
  @Query(() => Cart)
  async cartDetails(@Arg("cartId") cartId: number, @Ctx() ctx: Context) {
    const details = await ctx.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        ProductsOnCart: true,
        customer: true,
      },
    });

    if (!details) {
      throw new Error("No cart found");
    }

    return details;
  }

  @Mutation(() => Boolean)
  async addToCart(
    @Arg("cartId") cartId: number,
    @Arg("productId") productId: number,
    @Ctx() ctx: Context
  ) {
    const product = await ctx.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    const cart = await ctx.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    if (!product || !cart) {
      throw new Error("Product or cart not found");
    }

    const addProduct = await ctx.prisma.productsOnCart.create({
      data: { productId: product.id, cartId: cart.id },
    });

    if (addProduct) {
      return true;
    }
    return false;
  }

  @Mutation(() => Product)
  async removeFromCart(
    @Arg("cartId") cartId: number,
    @Arg("productId") productId: number,
    @Ctx() ctx: Context
  ): Promise<Product | null> {
    const cart = await ctx.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });

    const productToRemove = await ctx.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productToRemove || !cart) {
      throw new Error("Product or cart not found");
    }

    try {
      await ctx.prisma.productsOnCart.delete({
        where: {
          productId_cartId: { cartId: cart.id, productId: productToRemove.id },
        },
      });
      return productToRemove;
    } catch (e) {
      throw new Error("Product not in cart");
    }
  }

  @FieldResolver()
  async products(@Root() cart: Cart, @Ctx() ctx: Context): Promise<Product[]> {
    const userOrder = await ctx.prisma.productsOnCart.findMany({
      where: {
        cartId: cart.id,
      },
    });

    const productIds = userOrder.map((p) => p.productId);

    const productList = await ctx.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    return productList;
  }
}
