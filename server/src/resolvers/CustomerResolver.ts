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
  async allCustomers(@Ctx() ctx: Context) {
    return await ctx.prisma.customer.findMany({});
  }

  @Query(() => Customer)
  async singleCustomer(@Arg("data") data: number, @Ctx() ctx: Context) {
    return await ctx.prisma.customer.findUnique({ where: { id: data } });
  }

  // Test query for authentication. Only accessible if logged in
  @Query(() => String)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context) {
    console.log(ctx.payload);
    return `My user id is: ${ctx.payload!.customerId}`;
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
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          password: hashedPassword,
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
  async logout(@Ctx() ctx: Context) {
    ctx.res.cookie("jid", "", { httpOnly: false });
    return true;
  }
}
