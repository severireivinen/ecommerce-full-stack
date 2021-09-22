import { Decimal } from "@prisma/client/runtime";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { DecimalScalar } from "../scalars/Decimal";
import { Product } from "./Product";

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => DecimalScalar)
  price: Decimal;

  @Field(() => Int)
  orderId: number;

  @Field(() => Product)
  product: Product;
}
