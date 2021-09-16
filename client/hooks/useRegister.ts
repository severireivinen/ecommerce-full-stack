import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import { InputField } from "../utils/types";

const useRegister = () => {
  const [mutate, result] = useMutation(REGISTER);

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
  }: InputField) => {
    await mutate({
      variables: { email, password, firstName, lastName, phone },
    });
  };
  return [register, result];
};

export default useRegister;
