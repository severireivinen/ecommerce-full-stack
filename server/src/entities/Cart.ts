import { Field, ID, ObjectType } from "type-graphql";
import { Customer } from "./Customer";
import { Product } from "./Product";

@ObjectType()
export class Cart {
  @Field(() => ID)
  id: number;

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => Customer)
  customer: Customer;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
