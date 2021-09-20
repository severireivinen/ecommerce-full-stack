import { Field, ID, ObjectType } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
export class ProductCategory {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => [Product])
  products: Product[];
}
