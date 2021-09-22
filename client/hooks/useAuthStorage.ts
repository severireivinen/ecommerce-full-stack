import { useContext, createContext } from "react";
import AuthStorageContext from "../utils/AuthStorageContext";

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
