import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // @ts-ignore
  link: authLink.concat(httpLink),
});

export default client;
