import { Product } from "../entities/Product";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async allProducts(@Ctx() ctx: Context) {
    return ctx.prisma.product.findMany({});
  }

  @Query(() => Product)
  async singleProduct(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await ctx.prisma.product.findUnique({ where: { id: id } });
  }
}
