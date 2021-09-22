import { useQuery } from "@apollo/client";
import { CUSTOMER_CART } from "../graphql/queries";

const useCustomerCart = () => {
  const { data, loading, ...result } = useQuery(CUSTOMER_CART, {
    fetchPolicy: "cache-and-network",
  });

  return { cart: data ? data.getCustomerCart : null, loading, ...result };
};

export default useCustomerCart;
