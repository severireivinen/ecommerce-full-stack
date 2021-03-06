import { gql } from "@apollo/client";
import { CUSTOMER_DETAILS, PRODUCT_DETAILS } from "./fragments";

export const ALL_PRODUCTS = gql`
  query allProducts {
    allProducts {
      ...ProductDetails
    }
  }
  ${PRODUCT_DETAILS}
`;

export const SINGLE_PRODUCT = gql`
  query singleProduct($id: String!) {
    singleProduct(id: $id) {
      ...ProductDetails
    }
  }
  ${PRODUCT_DETAILS}
`;

export const AUTHORIZED_CUSTOMER = gql`
  query authorizedCustomer {
    authorizedCustomer {
      ...CustomerDetails
    }
  }
  ${CUSTOMER_DETAILS}
`;

export const CUSTOMER_CART = gql`
  query getCustomerCart {
    getCustomerCart {
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
