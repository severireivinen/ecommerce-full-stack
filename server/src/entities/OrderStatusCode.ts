import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class OrderStatusCode {
  @Field(() => ID)
  id: number;

  @Field(() => Boolean)
  processed: Boolean;

  @Field(() => String)
  description: string;
}
