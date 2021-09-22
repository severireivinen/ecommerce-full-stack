import { Field, ID, ObjectType } from "type-graphql";
import { Customer } from "./Customer";
import { OrderStatusCode } from "./OrderStatusCode";

@ObjectType()
export class Order {
  @Field(() => ID)
  id: number;

  @Field(() => Customer)
  customer: Customer;

  @Field(() => OrderStatusCode)
  orderStatusCode: OrderStatusCode;
}
