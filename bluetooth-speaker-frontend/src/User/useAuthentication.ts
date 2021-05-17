import { useCallback, useEffect, useMemo } from "react";
import http from "../Common/Utilities/HttpModule";
import camelcaseKeys from "camelcase-keys";
import { useCookies } from "react-cookie";
import Token from "./Token";
import axios from "axios";

const useAuthentication = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const setAxiosAuthHeader = useCallback((): void => {
    if (cookies.accessToken) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.accessToken}`,
      };
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    setAxiosAuthHeader();
  }, [cookies.accessToken]);

  const handleLogin = useCallback(
    async (values: any): Promise<void> => {
      try {
        const response = await http.post<Token>("api/auth/login", values);
        const tokenData: Token = camelcaseKeys(response.data);
        tokenData.expires = new Date();
        tokenData.expires.setFullYear(tokenData.expires.getFullYear() + 1);
        setCookie("accessToken", tokenData.data.token, {
          expires: tokenData.expires,
        });
        setAxiosAuthHeader();
      } catch (e) {
        console.log(e);
      }
    },
    [setAxiosAuthHeader, setCookie],
  );

  const handleRegister = useCallback(
    async (values: any): Promise<void> => {
      try {
        const response = await http.post<Token>("api/auth/register", values);
        const tokenData: Token = camelcaseKeys(response.data);
        tokenData.expires = new Date();
        tokenData.expires.setFullYear(tokenData.expires.getFullYear() + 1);
        setCookie("accessToken", tokenData.data.token, {
          expires: tokenData.expires,
        });
        setAxiosAuthHeader();
      } catch (e) {
        console.log(e);
      }
    },
    [setAxiosAuthHeader, setCookie],
  );

  const isLoggedIn = useMemo((): boolean => {
    return cookies.accessToken !== undefined;
  }, [cookies.accessToken]);

  const handleLogout = useCallback(async () => {
    try {
      await http.post("api/auth/logout");
      removeCookie("accessToken");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return { setAxiosAuthHeader, handleLogin, handleRegister, isLoggedIn, handleLogout };
};

export default useAuthentication;
