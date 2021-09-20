import { Customer } from "../entities/Customer";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { AuthenticationError } from "apollo-server-errors";
import { Context } from "../context";
import { createAccessToken } from "../utils/auth";
import { isAuth } from "../utils/isAuth";
import { ShoppingCartItem } from "../entities/ShoppingCartItem";

@InputType()
class UserRegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class CustomerResolver {
  @Query(() => [Customer])
  async allCustomers(@Ctx() ctx: Context): Promise<Customer[]> {
    return await ctx.prisma.customer.findMany({});
  }

  // Test query for authentication. Only accessible if logged in
  @Query(() => Customer)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context): Promise<Customer | null> {
    console.log(ctx.payload);
    const logged = await ctx.prisma.customer.findUnique({
      where: { id: ctx.payload!.customerId },
    });
    if (!logged) {
      throw new AuthenticationError("Not logged in");
    }
    return logged;
  }

  @Query(() => [ShoppingCartItem])
  async getCustomerCart(
    @Arg("customerId") customerId: number,
    @Ctx() ctx: Context
  ): Promise<ShoppingCartItem[] | null> {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error(`Could not find custmer with id ${customerId}`);
    }

    const customercart = await ctx.prisma.shoppingCartItem.findMany({
      where: {
        customerId: customer.id,
      },
      include: {
        product: true,
        customer: true,
      },
    });
    return customercart;
  }

  @Mutation(() => Boolean)
  async emptyCustomerCart(
    @Arg("customerId") customerId: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error(`Could not find customer with id ${customerId}`);
    }

    const anyItemsOnCart = await ctx.prisma.shoppingCartItem.findFirst({
      where: { customerId: customer.id },
    });

    if (!anyItemsOnCart) {
      throw new Error("User has no items on cart");
    }

    const deleteRecord = await ctx.prisma.shoppingCartItem.deleteMany({
      where: {
        customerId: customer.id,
      },
    });

    return deleteRecord ? true : false;
  }

  @Mutation(() => Customer)
  async register(
    @Arg("data") data: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<Customer | null> {
    const alreadyExist = await ctx.prisma.customer.findUnique({
      where: { email: data.email },
    });

    let customer = null;

    if (!alreadyExist) {
      const hashedPassword = await argon2.hash(data.password);
      customer = await ctx.prisma.customer.create({
        data: {
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
    }
    return customer;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<LoginResponse> {
    const customer = await ctx.prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (!customer) {
      throw new AuthenticationError("Invalid email or password"); // Wrong Email
    }

    const valid = await argon2.verify(customer.password, password);

    if (!valid) {
      throw new AuthenticationError("Invalid email or password");
    }

    const token = createAccessToken(customer);

    // Successful login
    //ctx.res.cookie("jid", createRefreshToken(customer), { httpOnly: false });
    ctx.res.cookie("jid", token, { httpOnly: false });

    return {
      accessToken: token,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    ctx.res.cookie("jid", "", { httpOnly: false });
    return true;
  }
}
