import { useCallback, useMemo } from "react";
import http from "../common/utilities/HttpModule";
import camelcaseKeys from "camelcase-keys";
import { useCookies } from "react-cookie";
import Token from "./Token";
import axios from "axios";

const useAuthentication = () => {
  const [cookies, setCookies] = useCookies();

  const setAxiosAuthHeader = useCallback((): void => {
    if (cookies.accessToken!) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.accessToken}`,
      };
    }
  }, [cookies.accessToken]);

  const handleLogin = useCallback(
    async (values: any): Promise<void> => {
      try {
        const { data } = await http.post<Token>("auth/login", values);
        const token: Token = camelcaseKeys(data);
        token.expires = new Date(token.expires);
        setCookies("accessToken", token.accessToken, {
          expires: token.expires,
        });
        setAxiosAuthHeader();
      } catch (e) {
        console.log(e);
      }
    },
    [setAxiosAuthHeader, setCookies]
  );

  const isLoggedIn = useMemo((): boolean => {
    return cookies.accessToken !== undefined;
  }, [cookies.accessToken]);

  return { setAxiosAuthHeader, handleLogin, isLoggedIn };
};

export default useAuthentication;
