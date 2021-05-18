import { useCallback, useEffect, useMemo, useState } from "react";
import http from "../Common/Utilities/HttpModule";
import camelcaseKeys from "camelcase-keys";
import { useCookies } from "react-cookie";
import Token from "./Token";
import axios from "axios";
import { useRecoilState } from "recoil";
import UserState from "../GlobalState/UserState";
import { User } from "../Common/Objects/User";

const useAuthentication = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useRecoilState(UserState);

  const setAxiosAuthHeader = useCallback((): void => {
    if (cookies.accessToken) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.accessToken}`,
      };
    }
  }, [cookies.accessToken]);

  const getUser = useCallback(async (): Promise<void> => {
    try {
      const {
        data: { id, name, email },
      } = await http.get<User>("/api/me");
      setUser({
        id: id,
        name: name,
        email: email,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (cookies.accessToken) {
      setAxiosAuthHeader();
      if (!user) getUser();
    }
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
