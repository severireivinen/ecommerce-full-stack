import { useQuery } from "@apollo/client";
import { SINGLE_PRODUCT } from "../graphql/queries";

const useProduct = (variables: number) => {
  const { data, loading, ...result } = useQuery(SINGLE_PRODUCT, {
    fetchPolicy: "cache-and-network",
    variables,
  });
  return { product: data ? data.singleProduct : null, loading, ...result };
};

export default useProduct;
