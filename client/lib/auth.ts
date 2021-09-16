import { useCookies } from "react-cookie";

const TOKEN_NAME = "jid";

export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

  const setAuthToken = (token: string) => setCookie(TOKEN_NAME, token);

  const removeAuthToken = () => removeCookie(TOKEN_NAME);

  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};
