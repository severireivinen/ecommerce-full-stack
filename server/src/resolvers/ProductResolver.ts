import { Product } from "../entities/Product";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async allProducts(@Ctx() ctx: Context) {
    return ctx.prisma.product.findMany({});
  }
}
