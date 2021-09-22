import { useApolloClient } from "@apollo/client";

export const useLogout = () => {
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore();
  };
  return logout;
};
