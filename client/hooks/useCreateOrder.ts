import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../graphql/mutations";

const useCreateOrder = (): any => {
  const [mutate, result] = useMutation(CREATE_ORDER);

  const createOrder = async () => {
    await mutate();
  };
  return [createOrder, result];
};

export default useCreateOrder;
