import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useRouter } from "next/router";
import { LOGOUT } from "../graphql/mutations";

export const useLogout = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(LOGOUT);
  const router = useRouter();
  const authStorage: any = useAuthStorage();

  const logout = async () => {
    console.log("Logging out");
    await mutate();
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    router.push("/");
  };
  return [logout, result];
};

export default useLogout;
