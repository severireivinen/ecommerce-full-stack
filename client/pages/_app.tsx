import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import AuthStorage from "../lib/authStorage";
import createApolloClient from "../lib/apollo-client";
import AuthStorageContext from "../utils/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Component {...pageProps} />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
export default MyApp;
