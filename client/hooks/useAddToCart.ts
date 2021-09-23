import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graphql/mutations";

const useAddToCart = (): any => {
  const [mutate, result] = useMutation(ADD_TO_CART);

  const addToCart = async ({ id }: any) => {
    await mutate({ variables: { id } });
  };
  return [addToCart, result];
};

export default useAddToCart;
