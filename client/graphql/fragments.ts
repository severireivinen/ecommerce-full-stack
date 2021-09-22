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

export const CUSTOMER_DETAILS = gql`
  fragment CustomerDetails on Customer {
    id
    email
    firstName
    lastName
    phone
    accessToken
  }
`;
