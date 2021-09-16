import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { LoginField } from "../utils/types";

const useLogin = () => {
  const [mutate, result] = useMutation(LOGIN);

  const login = async ({ email, password }: LoginField) => {
    //const { data } = await mutate({ variables: { email, password } });
    await mutate({ variables: { email, password } });
  };
  return [login, result];
};

export default useLogin;
