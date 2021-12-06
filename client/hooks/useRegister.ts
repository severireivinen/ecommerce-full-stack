import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import { InputField } from "../lib/types";

const useRegister = () => {
  const [mutate, result] = useMutation(REGISTER);

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
    city,
    postal,
  }: InputField) => {
    await mutate({
      variables: {
        email,
        password,
        firstName,
        lastName,
        phone,
        address,
        city,
        postal,
      },
    });
  };
  return [register, result];
};

export default useRegister;
