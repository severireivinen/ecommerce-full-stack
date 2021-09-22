import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const createApolloClient = (authStorage: any) => {
  const authLink = setContext((_, { headers }) => {
    const token = authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link: authLink.concat(httpLink),
  });
};

export default createApolloClient;
