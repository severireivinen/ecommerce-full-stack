import { Field, ID, ObjectType } from "type-graphql";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";
import { OrderStatusCode } from "./OrderStatusCode";

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Customer)
  customer: Customer;

  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @Field(() => OrderStatusCode, { nullable: true })
  orderStatusCode?: OrderStatusCode;
}
