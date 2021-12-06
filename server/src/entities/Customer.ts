import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Address } from "./Address";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field(() => Date)
  registeredAt: Date;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => Address, { nullable: true })
  address?: Address | null;
}
