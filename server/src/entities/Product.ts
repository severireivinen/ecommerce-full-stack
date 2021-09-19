import { Decimal } from "@prisma/client/runtime";
import { GraphQLScalarType, Kind } from "graphql";
import { Field, ID, ObjectType } from "type-graphql";

const DecimalScalar = new GraphQLScalarType({
  name: "Decimal",
  description: "Conver decimal value to numeric",
  serialize(value: unknown) {
    // check the type of received value
    if (!(value instanceof Decimal)) {
      throw new Error("ObjectIdScalar can only serialize Decimal values");
    }
    return value.toNumber();
  },
  parseValue(value: unknown): Decimal {
    if (typeof value !== "string") {
      throw new Error("ObjectIdScalar can only parse string values");
    }
    return new Decimal(value);
  },
  parseLiteral(ast): Decimal {
    if (ast.kind !== Kind.STRING) {
      throw new Error("ObjectIdScalar can only parse string values");
    }
    return new Decimal(ast.value);
  },
});

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => DecimalScalar)
  price: Decimal;

  @Field()
  description: string;

  @Field()
  stock: number;

  @Field()
  location: string;
}
