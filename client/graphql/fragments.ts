import { gql } from "@apollo/client";

export const PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    name
    price
    description
    location
  }
`;
