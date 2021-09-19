import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  makeVar,
} from "@apollo/client";
import { useAuthToken } from "./auth";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

// Initializes to an empty array
export const cartItemsVar = makeVar<string[]>([]);

const client = () => {
  const [authToken] = useAuthToken();
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink(authToken).concat(httpLink),
  });
};

export default client;
