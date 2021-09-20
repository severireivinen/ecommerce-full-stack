import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  phone: string;

  @Field(() => Date)
  registeredAt: Date;
}
