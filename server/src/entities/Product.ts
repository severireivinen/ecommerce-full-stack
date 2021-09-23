import { Decimal } from "@prisma/client/runtime";
import { Field, ID, ObjectType } from "type-graphql";
import { DecimalScalar } from "../scalars/Decimal";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => DecimalScalar)
  price: Decimal;

  stock: number;

  @Field(() => String)
  location: string;
}
