import { Decimal } from "@prisma/client/runtime";
import { DecimalScalar } from "../scalars/Decimal";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Product } from "./Product";
import { Customer } from "./Customer";

@ObjectType()
export class ShoppingCartItem {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => DecimalScalar)
  price: Decimal;

  @Field(() => Product)
  product: Product;

  @Field(() => Customer)
  customer: Customer;
}
