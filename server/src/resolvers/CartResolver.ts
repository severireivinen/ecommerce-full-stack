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

  @Mutation(() => Product)
  async addToCart(
    @Arg("cartId") cartId: number,
    @Arg("productId") productId: number,
    @Ctx() ctx: Context
  ): Promise<Product | null> {
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

    /*const alreadyInCart = await ctx.prisma.productsOnCart.findUnique({
      where: {
        productId_cartId: { cartId: cart.id, productId: product.id },
      },
    });*/

    /*if (alreadyInCart) {
      await ctx.prisma.productsOnCart.update({

      })
    }*/

    /*const addProduct = await ctx.prisma.productsOnCart.create({
      data: { productId: product.id, cartId: cart.id, amount: 1 },
    });*/
    try {
      await ctx.prisma.productsOnCart.upsert({
        where: { productId_cartId: { cartId: cart.id, productId: product.id } },
        update: { amount: { increment: 1 } },
        create: { cartId: cart.id, productId: product.id, amount: 1 },
      });
      return product;
    } catch (e) {
      throw new Error("Failed to add a product");
    }
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

    /*try {
      await ctx.prisma.productsOnCart.delete({
        where: {
          productId_cartId: { cartId: cart.id, productId: productToRemove.id },
        },
      });
      return productToRemove;
    } catch (e) {
      throw new Error("Product not in cart");
    }*/
    try {
      const onlyOneInCart = await ctx.prisma.productsOnCart.findUnique({
        where: {
          productId_cartId: { cartId: cart.id, productId: productToRemove.id },
        },
      });
      if (!onlyOneInCart) {
        throw new Error("Product not in cart");
      } else if (onlyOneInCart.amount === 1) {
        await ctx.prisma.productsOnCart.delete({
          where: {
            productId_cartId: {
              cartId: cart.id,
              productId: productToRemove.id,
            },
          },
        });
        return productToRemove;
      } else {
        await ctx.prisma.productsOnCart.update({
          where: {
            productId_cartId: {
              cartId: cart.id,
              productId: productToRemove.id,
            },
          },
          data: { amount: { decrement: 1 } },
        });
        return productToRemove;
      }
    } catch (e) {
      throw new Error("Failed to remove product");
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
