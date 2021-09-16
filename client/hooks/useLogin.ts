import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useAuthToken } from "../lib/auth";
import { LoginField } from "../utils/types";

const useLogin = () => {
  const [mutate, result] = useMutation(LOGIN);
  const [_, setAuthToken] = useAuthToken();

  const login = async ({ email, password }: LoginField) => {
    //const { data } = await mutate({ variables: { email, password } });

    //setAuthToken(data.login.accessToken);
    await mutate({ variables: { email, password } });
  };
  return [login, result];
};

export default useLogin;
