import { Decimal } from "@prisma/client/runtime";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { DecimalScalar } from "../scalars/Decimal";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => DecimalScalar)
  price: Decimal;

  @Field(() => Int)
  stock: number;

  @Field(() => String)
  location: string;
}
