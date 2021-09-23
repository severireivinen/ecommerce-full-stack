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
} from "type-graphql";
import argon2 from "argon2";
import { AuthenticationError } from "apollo-server-errors";
import { Context } from "../context";
import { ShoppingCartItem } from "../entities/ShoppingCartItem";
import signJwt from "../utils/signJwt";
import verifyJwt from "../utils/verifyJwt";

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

  @Query(() => Customer)
  async authorizedCustomer(@Ctx() ctx: Context): Promise<Customer | null> {
    const token = ctx.req.headers.authorization;
    if (!token) {
      throw new AuthenticationError("No token provided");
    }

    const user = verifyJwt(token);
    console.log("User: ", user);

    const tokenFound = await ctx.prisma.customer.findUnique({
      where: { accessToken: token },
    });

    if (!tokenFound) {
      throw new AuthenticationError("Invalid token provided");
    }
    return tokenFound;
  }

  @Query(() => [ShoppingCartItem])
  async getCustomerCart(
    @Ctx() ctx: Context
  ): Promise<ShoppingCartItem[] | null> {
    const token = ctx.req.headers.authorization;
    const customer = await ctx.prisma.customer.findUnique({
      where: { accessToken: token },
    });

    if (!customer) {
      throw new Error(`Could not find custmer`);
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

    //@ts-ignore
    return customercart;
  }

  @Mutation(() => Boolean)
  async emptyCustomerCart(
    @Arg("customerId") customerId: string,
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

    const token = signJwt({ ...customer, accessToken: null });
    await ctx.prisma.customer.update({
      where: { id: customer.id },
      data: { accessToken: `${token}` },
    });

    console.log(customer);
    return {
      accessToken: `${token}`,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    const token = ctx.req.headers.authorization;
    try {
      await ctx.prisma.customer.update({
        where: { accessToken: token },
        data: { accessToken: null },
      });
      return true;
    } catch (e) {
      throw new Error("Error logging out");
    }
  }
}
