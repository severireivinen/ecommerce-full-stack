import { Field, ID, ObjectType } from "type-graphql";
import { Customer } from "./Customer";
import { Product } from "./Product";

@ObjectType()
export class Order {
  @Field(() => ID)
  id: number;

  @Field()
  orderDate: Date;

  @Field()
  finishDate: Date;

  @Field()
  products: [Product];

  @Field()
  customer: Customer;

  @Field()
  customerId: number;
}
