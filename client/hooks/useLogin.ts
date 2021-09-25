import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { LoginField } from "../lib/types";
import { useRouter } from "next/router";
import useAuthStorage from "./useAuthStorage";

const useLogin = () => {
  const [mutate, result] = useMutation(LOGIN);
  const router = useRouter();
  const client = useApolloClient();
  const authStorage: any = useAuthStorage();

  const login = async ({ email, password }: LoginField) => {
    const { data } = await mutate({ variables: { email, password } });
    console.log(data);
    await authStorage.setAccessToken(data.login.accessToken);
    client.resetStore();
    router.push("/");
  };
  return [login, result];
};

export default useLogin;
