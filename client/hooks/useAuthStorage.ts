import { useContext, createContext } from "react";
import AuthStorageContext from "../lib/AuthStorageContext";

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
