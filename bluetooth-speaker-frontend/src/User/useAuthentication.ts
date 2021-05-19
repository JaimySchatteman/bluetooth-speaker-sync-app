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
  const [{ accessToken }, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useRecoilState(UserState);

  const setAxiosAuthHeader = useCallback((): void => {
    if (accessToken) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }, [accessToken]);

  const getUser = useCallback(async (): Promise<void> => {
    try {
      const {
        data: { id, name, email },
      } = await http.get<User>("me");
      setUser({
        id: id,
        name: name,
        email: email,
      });
    } catch (e) {
      console.log(e);
    }
  }, [setUser]);

  useEffect(() => {
    if (accessToken) {
      setAxiosAuthHeader();
      if (!user) getUser();
    }
  }, [accessToken, getUser, setAxiosAuthHeader, user]);

  const handleLogin = useCallback(
    async (values: any): Promise<void> => {
      try {
        const { data } = await http.post<Token>("auth/login", values);
        const tokenData: Token = camelcaseKeys(data);
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
        const { data } = await http.post<Token>("auth/register", values);
        const tokenData: Token = camelcaseKeys(data);
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
    return accessToken !== undefined;
  }, [accessToken]);

  const handleLogout = useCallback(async () => {
    try {
      await http.post("auth/logout");
      removeCookie("accessToken");
      setUser(undefined);
    } catch (e) {
      console.log(e);
    }
  }, [removeCookie, setUser]);

  return { setAxiosAuthHeader, handleLogin, handleRegister, isLoggedIn, handleLogout };
};

export default useAuthentication;
