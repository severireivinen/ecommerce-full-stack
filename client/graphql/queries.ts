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
  query singleProduct($id: any) {
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
