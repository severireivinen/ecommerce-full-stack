import { useQuery } from "@apollo/client";
import { AUTHORIZED_CUSTOMER } from "../graphql/queries";

const useAuthorizedCustomer = () => {
  const { data, loading } = useQuery(AUTHORIZED_CUSTOMER, {
    fetchPolicy: "cache-and-network",
  });

  return {
    authorizedCustomer: data ? data.authorizedCustomer : null,
    loading,
  };
};

export default useAuthorizedCustomer;
