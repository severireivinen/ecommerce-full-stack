import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  postal: string;
}
