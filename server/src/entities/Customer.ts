import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  phone: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
