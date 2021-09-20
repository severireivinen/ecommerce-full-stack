import { Field, ID, ObjectType } from "type-graphql";
import { Order } from "./Order";

@ObjectType()
export class Shipment {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  toAddress: string;

  @Field(() => String)
  trackingNo: string;

  @Field(() => Date)
  sentAt: Date;

  @Field(() => Order)
  order: Order;
}
