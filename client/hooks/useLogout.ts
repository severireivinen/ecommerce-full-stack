import { useApolloClient } from "@apollo/client";
import { useAuthToken } from "../lib/auth";

const TOKEN_NAME = "jid";

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore();
    removeAuthToken();
  };
  return logout;
};
