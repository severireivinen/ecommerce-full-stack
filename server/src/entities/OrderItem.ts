import { Decimal } from "@prisma/client/runtime";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { DecimalScalar } from "../scalars/Decimal";
import { Order } from "./Order";
import { Product } from "./Product";

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => DecimalScalar)
  price: Decimal;

  @Field(() => Order)
  orderId: Order;

  @Field(() => Product)
  product: Product;
}
