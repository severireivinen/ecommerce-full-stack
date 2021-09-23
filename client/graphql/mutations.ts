import { gql } from "@apollo/client";
import { PRODUCT_DETAILS } from "./fragments";

export const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    register(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phone: $phone
      }
    ) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($id: String!) {
    addToCart(id: $id) {
      id
      quantity
      price
      product {
        ...ProductDetails
      }
    }
  }
  ${PRODUCT_DETAILS}
`;

export const CREATE_ORDER = gql`
  mutation createOrder {
    createOrder
  }
`;
