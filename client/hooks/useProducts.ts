import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "../graphql/queries";

const useProducts = () => {
  const { data, loading, ...result } = useQuery(ALL_PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });

  return { products: data ? data.allProducts : null, loading, ...result };
};

export default useProducts;
